/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Path extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Path/costumes/costume1.svg", {
        x: 214.29122675115048,
        y: 136.40534598458936,
      }),
    ];

    this.sounds = [new Sound("pop", "./Path/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.goto(0, 0);
      this.moveBehind();
      this.effects.ghost = 100;
      yield;
    }
  }
}
