/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Turretcollider extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Turretcollider/costumes/costume1.svg", {
        x: 26.646512007352925,
        y: 27.741584144641422,
      }),
    ];

    this.sounds = [new Sound("pop", "./Turretcollider/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlaceTurret" },
        this.whenIReceivePlaceturret
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];

    this.vars.mouseaction = "none";
    this.vars.canplacetower = 0;
    this.vars.canshoot = 0;
    this.vars.mouseAction = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(196, 158);
    this.size = 40;
    this.moveBehind();
  }

  *startAsClone() {
    this.visible = true;
    this.size = 50;
    this.vars.mouseaction = "selected";
    while (true) {
      this.moveAhead();
      if (this.toString(this.vars.mouseaction) === "selected") {
        this.goto(this.mouse.x, this.mouse.y);
        if (
          this.touching(this.sprites["Path"].andClones()) ||
          this.touching(this.sprites["Placedturretcollider"].andClones())
        ) {
          this.vars.canplacetower = "no";
          this.effects.ghost = 20;
        } else {
          this.vars.canplacetower = "yes";
          this.effects.ghost = 100;
        }
      }
      yield;
    }
  }

  *whenIReceivePlaceturret() {
    this.vars.mouseaction = "none";
  }

  *startAsClone2() {
    this.vars.canshoot = "no";
    this.size = 50;
    while (true) {
      if (this.toString(this.vars.canplacetower) === "yes") {
        if (this.mouse.down) {
          while (!!this.mouse.down) {
            yield;
          }
          this.broadcast("PlaceTurret");
          this.vars.mouseAction = "none";
          this.vars.canplacetower = "no";
          this.deleteThisClone();
        }
      }
      yield;
    }
  }
}
