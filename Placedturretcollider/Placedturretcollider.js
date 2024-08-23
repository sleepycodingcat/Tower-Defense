/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Placedturretcollider extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Placedturretcollider/costumes/costume1.svg", {
        x: 26.646510000000006,
        y: 27.741584999999986,
      }),
    ];

    this.sounds = [new Sound("pop", "./Placedturretcollider/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlaceTurret" },
        this.whenIReceivePlaceturret
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlaceTurret" },
        this.whenIReceivePlaceturret2
      ),
    ];

    this.vars.mouseaction = "none";
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.effects.ghost = 100;
  }

  *startAsClone() {
    this.visible = false;
    this.size = 50;
    this.vars.mouseaction = "selected";
    while (true) {
      this.moveAhead();
      if (this.toString(this.vars.mouseaction) === "selected") {
        this.goto(this.mouse.x, this.mouse.y);
      }
      yield;
    }
  }

  *whenIReceivePlaceturret() {
    this.vars.mouseaction = "none";
  }

  *whenIReceivePlaceturret2() {
    this.visible = true;
    this.vars.mouseaction = "none";
  }
}
