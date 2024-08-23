/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Base extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Base/costumes/costume1.svg", {
        x: 30.625,
        y: 30.625,
      }),
    ];

    this.sounds = [new Sound("pop", "./Base/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlaceTurret" },
        this.whenIReceivePlaceturret
      ),
    ];

    this.vars.mouseaction = "none";
  }

  *whenGreenFlagClicked() {
    this.goto(196, 158);
    this.size = 40;
    this.moveBehind();
    this.visible = true;
  }

  *startAsClone() {
    this.size = 50;
    this.vars.mouseaction = "selected";
    while (true) {
      this.moveAhead();
      this.moveBehind(5);
      if (this.toString(this.vars.mouseaction) === "selected") {
        this.goto(this.mouse.x, this.mouse.y);
      }
      yield;
    }
  }

  *whenIReceivePlaceturret() {
    this.vars.mouseaction = "none";
  }
}
