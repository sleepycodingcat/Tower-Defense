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
      new Costume("normal", "./Enemy/costumes/normal.svg", {
        x: 16.65102999999999,
        y: 16.65102999999999,
      }),
      new Costume("fast", "./Enemy/costumes/fast.svg", {
        x: 16.651005000000026,
        y: 16.650994999999966,
      }),
      new Costume("pop", "./Enemy/costumes/pop.svg", {
        x: 25.757362667166433,
        y: 29.48874636913419,
      }),
    ];

    this.sounds = [new Sound("Meow", "./Enemy/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];

    this.vars.moveSpeed = 5;
    this.vars.turnSpeed = 10;
    this.vars.clone = 5;
    this.vars.clonecostumename = "fast";

    this.watchers.clonecostumename = new Watcher({
      label: "Enemy: CloneCostumeName",
      style: "normal",
      visible: true,
      value: () => this.vars.clonecostumename,
      x: 245,
      y: 104,
    });
  }

  *whenGreenFlagClicked() {
    this.vars.clone = 0;
    this.stage.vars.enemyx = [];
    this.stage.vars.enemyy = [];
    this.stage.vars.enemyprogress = [];
    this.stage.vars.enemyids = [];
    this.visible = false;
    yield* this.spawnenemy("normal", 20, 0.3);
    yield* this.spawnenemy("fast", 20, 0.2);
  }

  *enemyMovement() {
    this.stage.vars.enemyx.splice(this.vars.clone - 1, 1, this.x);
    this.stage.vars.enemyy.splice(this.vars.clone - 1, 1, this.y);
    this.stage.vars.enemyprogress.splice(
      this.vars.clone - 1,
      1,
      this.toNumber(
        this.itemOf(this.stage.vars.enemyprogress, this.vars.clone - 1)
      ) + this.toNumber(this.vars.moveSpeed)
    );
    this.move(this.toNumber(this.vars.moveSpeed));
    this.costume = "costume1";
    if (this.touching(this.sprites["Line"].andClones())) {
      this.direction -= this.toNumber(this.vars.turnSpeed);
    }
    this.costume = "costume2";
    if (this.touching(this.sprites["Line"].andClones())) {
      this.direction += this.toNumber(this.vars.turnSpeed);
    }
    this.costume = this.vars.clonecostumename;
  }

  *startAsClone() {
    this.visible = true;
    this.stage.vars.enemyx.push("");
    this.stage.vars.enemyy.push("");
    this.stage.vars.enemyprogress.push(0);
    this.stage.vars.enemyids.push(this.vars.clone);
    this.goto(-192, -170);
    this.size = 60;
    this.direction = 0;
    this.costume = "normal";
    while (true) {
      this.moveBehind();
      this.moveAhead(1);
      if (
        !(
          this.toString(
            this.itemOf(this.stage.vars.enemyprogress, this.vars.clone - 1)
          ) === "dead"
        )
      ) {
        yield* this.enemyMovement();
      }
      yield;
    }
  }

  *startAsClone2() {
    while (!!this.touching("edge")) {
      yield;
    }
    while (true) {
      if (
        this.toString(
          this.itemOf(this.stage.vars.enemyprogress, this.vars.clone - 1)
        ) === "dead" ||
        this.touching("edge")
      ) {
        this.stage.vars.enemyx.splice(this.vars.clone - 1, 1, "");
        this.stage.vars.enemyy.splice(this.vars.clone - 1, 1, "");
        this.stage.vars.enemyids.splice(
          this.indexInArray(this.stage.vars.enemyids, this.vars.clone),
          1
        );
        this.costume = "pop";
        yield* this.wait(0.05);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *spawnenemy(enemytype, ammount, delay) {
    this.vars.clonecostumename = enemytype;
    this.costume = this.vars.clonecostumename;
    if (this.toString(enemytype) === "normal") {
      this.vars.moveSpeed = 3;
      this.vars.turnSpeed = 7;
    } else {
      if (this.toString(enemytype) === "fast") {
        this.vars.moveSpeed = 5;
        this.vars.turnSpeed = 10;
      }
    }
    for (let i = 0; i < this.toNumber(ammount); i++) {
      this.vars.clone++;
      this.createClone();
      yield* this.wait(this.toNumber(delay));
      yield;
    }
  }
}
