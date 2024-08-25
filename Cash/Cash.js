/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cash extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("", "./Cash/costumes/.svg", { x: 0, y: 0 }),
      new Costume("0", "./Cash/costumes/0.svg", { x: 29, y: 39 }),
      new Costume("1", "./Cash/costumes/1.svg", { x: 24, y: 39 }),
      new Costume("2", "./Cash/costumes/2.svg", { x: 28, y: 41 }),
      new Costume("3", "./Cash/costumes/3.svg", { x: 33, y: 42 }),
      new Costume("4", "./Cash/costumes/4.svg", { x: 31, y: 38 }),
      new Costume("5", "./Cash/costumes/5.svg", { x: 30, y: 38 }),
      new Costume("6", "./Cash/costumes/6.svg", { x: 30, y: 37 }),
      new Costume("7", "./Cash/costumes/7.svg", { x: 31, y: 42 }),
      new Costume("8", "./Cash/costumes/8.svg", { x: 31, y: 37 }),
      new Costume("9", "./Cash/costumes/9.svg", { x: 28, y: 36 }),
    ];

    this.sounds = [new Sound("pop", "./Cash/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];

    this.vars.index = 11;
  }

  *whenGreenFlagClicked() {
    this.goto(-210, 105);
    this.costume = 9;
    this.size = 30;
    this.visible = false;
    this.vars.index = 1;
    yield* this.makeitcooler();
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      this.costume = this.letterOf(this.stage.vars.cash, this.vars.index - 1);
      yield;
    }
  }

  *makeitcooler() {
    for (let i = 0; i < 10; i++) {
      this.createClone();
      this.x += this.size / 2;
      this.vars.index++;
    }
  }
}
