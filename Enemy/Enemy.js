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
        y: 16.650994999999938,
      }),
      new Costume("strong", "./Enemy/costumes/strong.svg", {
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
      new Trigger(
        Trigger.BROADCAST,
        { name: "NewWave" },
        this.whenIReceiveNewwave
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "LaserHitEnemy" },
        this.whenIReceiveLaserhitenemy
      ),
    ];

    this.vars.moveSpeed = 2;
    this.vars.turnSpeed = 5;
    this.vars.clone = 20;
    this.vars.clonecostumename = "normal";
    this.vars.health = 2;
    this.vars.drawcashammount = 1;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.enemyx = [];
    this.stage.vars.enemyy = [];
    this.stage.vars.enemyprogress = [];
    this.stage.vars.enemyids = [];
    this.stage.vars.enemyhealth = [];
    this.stage.vars.maxenemyhealth = [];
    this.stage.vars.wave = 0;
    this.stage.vars.cash = 1000;
    while (!(this.toNumber(this.stage.vars.wave) === 1)) {
      yield;
    }
    yield* this.wait(0);
    yield* this.spawnenemy("normal", 10, 0.5);
    this.stage.vars.donespawning = "yes";
    while (!(this.toNumber(this.stage.vars.wave) === 2)) {
      yield;
    }
    yield* this.wait(0);
    yield* this.spawnenemy("normal", 20, 0.5);
    yield* this.spawnenemy("fast", 8, 0.4);
    yield* this.spawnenemy("strong", 10, 0.8);
    this.stage.vars.donespawning = "yes";
    while (!(this.toNumber(this.stage.vars.wave) === 3)) {
      yield;
    }
    yield* this.wait(0);
    yield* this.spawnenemy("normal", 15, 0.5);
    yield* this.spawnenemy("fast", 30, 0.3);
    yield* this.spawnenemy("strong", 10, 0.8);
    this.stage.vars.donespawning = "yes";
    while (!(this.toNumber(this.stage.vars.wave) === 4)) {
      yield;
    }
    yield* this.wait(0);
    yield* this.spawnenemy("normal", 20, 0.5);
    yield* this.spawnenemy("fast", 30, 0.3);
    yield* this.spawnenemy("strong", 15, 0.8);
    this.stage.vars.donespawning = "yes";
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
    this.costume = this.vars.clonecostumename;
    this.stage.vars.enemyx.splice(this.vars.clone - 1, 1, this.x);
    this.stage.vars.enemyy.splice(this.vars.clone - 1, 1, this.y);
    this.stage.vars.enemyprogress.splice(
      this.vars.clone - 1,
      1,
      this.toNumber(
        this.itemOf(this.stage.vars.enemyprogress, this.vars.clone - 1)
      ) + this.toNumber(this.vars.moveSpeed)
    );
  }

  *startAsClone() {
    this.visible = true;
    this.stage.vars.enemyx.push("");
    this.stage.vars.enemyy.push("");
    this.stage.vars.enemyprogress.push(0);
    this.stage.vars.enemyids.push(this.vars.clone);
    this.stage.vars.enemyhealth.push(this.vars.health);
    this.stage.vars.maxenemyhealth.push(this.vars.health);
    this.goto(-192, -170);
    this.size = 60;
    this.direction = 0;
    this.costume = "normal";
    while (true) {
      this.moveBehind();
      this.moveAhead(1);
      if (
        this.compare(
          this.itemOf(this.stage.vars.enemyhealth, this.vars.clone - 1),
          0
        ) > 0
      ) {
        yield* this.enemyMovement();
      }
      this.broadcast("DrawHealthBars");
      yield;
    }
  }

  *startAsClone2() {
    while (!!this.touching("edge")) {
      yield;
    }
    while (true) {
      if (
        this.compare(
          this.itemOf(this.stage.vars.enemyhealth, this.vars.clone - 1),
          1
        ) < 0
      ) {
        this.stage.vars.cash += this.toNumber(this.vars.drawcashammount);
        yield* this.enemydestroyed();
      }
      if (this.touching("edge")) {
        yield* this.enemydestroyed();
      }
      yield;
    }
  }

  *spawnenemy(enemytype, ammount, delay) {
    this.vars.clonecostumename = enemytype;
    this.costume = this.vars.clonecostumename;
    if (this.toString(enemytype) === "normal") {
      this.vars.moveSpeed = 2;
      this.vars.turnSpeed = 5;
      this.vars.health = 3;
      this.vars.drawcashammount = 1;
    } else {
      if (this.toString(enemytype) === "fast") {
        this.vars.moveSpeed = 6;
        this.vars.turnSpeed = 18;
        this.vars.health = 1;
        this.vars.drawcashammount = 2;
      } else {
        if (this.toString(enemytype) === "strong") {
          this.vars.moveSpeed = 1;
          this.vars.turnSpeed = 3;
          this.vars.health = 8;
          this.vars.drawcashammount = 5;
        } else {
          null;
        }
      }
    }
    for (let i = 0; i < this.toNumber(ammount); i++) {
      this.vars.clone++;
      this.createClone();
      yield* this.wait(this.toNumber(delay));
      yield;
    }
  }

  *whenIReceiveNewwave() {
    this.stage.vars.donespawning = "no";
    this.stage.vars.enemyx = [];
    this.stage.vars.enemyy = [];
    this.stage.vars.enemyprogress = [];
    this.stage.vars.enemyids = [];
    this.stage.vars.enemyhealth = [];
    this.stage.vars.maxenemyhealth = [];
    this.vars.clone = 0;
  }

  *enemydestroyed() {
    this.stage.vars.enemyx.splice(this.vars.clone - 1, 1, "");
    this.stage.vars.enemyy.splice(this.vars.clone - 1, 1, "");
    this.stage.vars.enemyhealth.splice(this.vars.clone - 1, 1, 0);
    this.stage.vars.enemyids.splice(
      this.indexInArray(this.stage.vars.enemyids, this.vars.clone),
      1
    );
    this.costume = "pop";
    yield* this.wait(0.05);
    this.deleteThisClone();
  }

  *whenIReceiveLaserhitenemy() {
    if (
      this.touching(this.sprites["Laser"].andClones()) &&
      !this.touching("edge")
    ) {
      this.stage.vars.enemyhealth.splice(
        this.vars.clone - 1,
        1,
        this.toNumber(
          this.itemOf(this.stage.vars.enemyhealth, this.vars.clone - 1)
        ) - this.toNumber(this.stage.vars.laserdamage)
      );
    }
  }
}
