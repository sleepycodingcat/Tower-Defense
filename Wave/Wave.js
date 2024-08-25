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
      new Costume("", "./Wave/costumes/.svg", { x: 0, y: 0 }),
      new Costume("1", "./Wave/costumes/1.svg", { x: 24, y: 39 }),
      new Costume("2", "./Wave/costumes/2.svg", { x: 28, y: 41 }),
      new Costume("3", "./Wave/costumes/3.svg", { x: 33, y: 42 }),
      new Costume("4", "./Wave/costumes/4.svg", { x: 31, y: 38 }),
      new Costume("5", "./Wave/costumes/5.svg", { x: 30, y: 38 }),
      new Costume("6", "./Wave/costumes/6.svg", { x: 30, y: 37 }),
      new Costume("7", "./Wave/costumes/7.svg", { x: 31, y: 42 }),
      new Costume("8", "./Wave/costumes/8.svg", { x: 31, y: 37 }),
      new Costume("9", "./Wave/costumes/9.svg", { x: 28, y: 36 }),
    ];

    this.sounds = [new Sound("pop", "./Wave/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "NewWave" },
        this.whenIReceiveNewwave
      ),
    ];

    this.vars.index = 9;
  }

  *whenGreenFlagClicked() {
    this.goto(-50, 147);
    this.costume = 9;
    this.size = 45;
    this.visible = false;
    this.vars.index = 1;
    this.stage.vars.canmakeclonesofwave = "yes";
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      this.costume = this.letterOf(this.stage.vars.wave, this.vars.index - 1);
      yield;
    }
  }

  *makeitcooler() {
    for (let i = 0; i < 8; i++) {
      this.createClone();
      this.x += this.size / 2;
      this.vars.index++;
    }
  }

  *whenIReceiveNewwave() {
    if (this.toString(this.stage.vars.canmakeclonesofwave) === "yes") {
      yield* this.makeitcooler();
    }
    this.stage.vars.canmakeclonesofwave = "no";
  }
}
