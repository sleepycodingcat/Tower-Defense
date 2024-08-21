/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TurretRange extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./TurretRange/costumes/costume1.svg", {
        x: 100.5,
        y: 100.49999999999997,
      }),
    ];

    this.sounds = [new Sound("pop", "./TurretRange/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.viewradius = 100;
    this.effects.ghost = 50;
    while (true) {
      if (this.toString(this.stage.vars.canshowradiuscircle) === "yes") {
        this.visible = true;
        this.goto(this.mouse.x, this.mouse.y);
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
