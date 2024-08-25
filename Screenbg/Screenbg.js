/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Screenbg extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Screenbg/costumes/costume1.svg", {
        x: 249.84984068541166,
        y: 197.59760676203547,
      }),
    ];

    this.sounds = [new Sound("pop", "./Screenbg/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(0, 0);
    this.effects.ghost = 100;
    while (true) {
      this.moveBehind();
      this.moveAhead(3);
      if (this.touching("mouse") && this.mouse.down) {
        this.stage.vars.selectedturret = 0;
      }
      yield;
    }
  }
}
