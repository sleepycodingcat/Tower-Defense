/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Wave extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Wave/costumes/costume1.svg", {
        x: 28.150000005960464,
        y: 19.68125076293944,
      }),
    ];

    this.sounds = [new Sound("pop", "./Wave/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "NewWave" },
        this.whenIReceiveNewwave
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(-146, 145);
  }

  *whenIReceiveNewwave() {
    this.visible = true;
  }
}
