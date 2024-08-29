/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Laser extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Laser/costumes/costume1.svg", {
        x: 0.15090090090120611,
        y: 9.75,
      }),
    ];

    this.sounds = [new Sound("pop", "./Laser/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "NewWave" },
        this.whenIReceiveNewwave
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
    ];

    this.vars.laser = 31;
  }

  *whenIReceiveNewwave() {
    this.vars.laser = 0;
  }

  *spawnlaserclones() {
    while (
      !(this.compare(this.stage.vars.laserx.length, this.vars.laser) === 0)
    ) {
      this.vars.laser++;
      this.direction = this.toNumber(
        this.itemOf(this.stage.vars.laserdirection, this.vars.laser - 1)
      );
      this.goto(
        this.toNumber(this.itemOf(this.stage.vars.laserx, this.vars.laser - 1)),
        this.toNumber(this.itemOf(this.stage.vars.lasery, this.vars.laser - 1))
      );
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.effects.clear();
    this.visible = true;
    this.moveBehind(20);
    this.broadcast("LaserHitEnemy");
    yield* this.wait(0.3);
    for (let i = 0; i < 5; i++) {
      this.effects.ghost += 20;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveStartGame() {
    this.visible = false;
    this.vars.laser = 0;
    yield* this.wait(0);
    while (true) {
      yield* this.spawnlaserclones();
      yield;
    }
  }
}
