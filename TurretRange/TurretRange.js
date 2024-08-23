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
        x: 99.62205882352939,
        y: 99.62205882352944,
      }),
    ];

    this.sounds = [new Sound("pop", "./TurretRange/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.viewradius = 80;
    this.effects.ghost = 50;
    while (true) {
      if (this.toString(this.stage.vars.canshowradiuscircle) === "yes") {
        this.visible = true;
        this.goto(this.mouse.x, this.mouse.y);
      } else {
        this.visible = false;
      }
      this.visible = true;
      this.size = (this.toNumber(this.stage.vars.viewradius) / 100) * 100;
      this.moveAhead();
      this.moveBehind(10);
      yield;
    }
  }
}
