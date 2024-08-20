/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Enemy/costumes/costume1.svg", {
        x: -18.552284999999983,
        y: 12.273965000000004,
      }),
      new Costume("costume2", "./Enemy/costumes/costume2.svg", {
        x: -18.552295000000015,
        y: -5.522944999999993,
      }),
      new Costume("costume3", "./Enemy/costumes/costume3.svg", {
        x: 16.651025000000004,
        y: 16.651025000000004,
      }),
    ];

    this.sounds = [new Sound("Meow", "./Enemy/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];

    this.vars.moveSpeed = 3;
    this.vars.turnSpeed = 6;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    for (let i = 0; i < 5; i++) {
      this.createClone();
      yield* this.wait(0.2);
      yield;
    }
  }

  *enemyMovement() {
    this.move(this.toNumber(this.vars.moveSpeed));
    this.costume = "costume1";
    if (this.touching(this.sprites["Line"].andClones())) {
      this.direction -= this.toNumber(this.vars.turnSpeed);
    }
    this.costume = "costume2";
    if (this.touching(this.sprites["Line"].andClones())) {
      this.direction += this.toNumber(this.vars.turnSpeed);
    }
    this.costume = "costume3";
  }

  *startAsClone() {
    this.goto(-192, -170);
    this.size = 60;
    this.direction = 0;
    this.costume = "costume3";
    this.visible = true;
    this.vars.moveSpeed = 4;
    this.vars.turnSpeed = 9;
    while (true) {
      yield* this.enemyMovement();
      yield;
    }
  }

  *startAsClone2() {
    while (!!this.touching("edge")) {
      yield;
    }
    while (true) {
      if (this.touching("edge")) {
        this.visible = false;
      }
      yield;
    }
  }
}
