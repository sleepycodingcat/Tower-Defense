/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Wavewave2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Wavewave2/costumes/costume1.svg", {
        x: 26.90468630847684,
        y: 18.8243700000001,
      }),
      new Costume("$", "./Wavewave2/costumes/$.svg", {
        x: 8.471783083571609,
        y: 13.345988333333338,
      }),
    ];

    this.sounds = [new Sound("pop", "./Wavewave2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "NewWave" },
        this.whenIReceiveNewwave
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(-146, 145);
    this.costume = "costume1";
    this.createClone();
  }

  *whenIReceiveNewwave() {
    this.visible = true;
  }

  *startAsClone() {
    this.visible = true;
    this.costume = "$";
    this.goto(-223, 105);
  }
}
