/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Turret extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Turret/costumes/costume1.svg", {
        x: 18.625,
        y: 18.625,
      }),
    ];

    this.sounds = [new Sound("pop", "./Turret/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];

    this.vars.mouseAction = "selected";
    this.vars.targetenemy = 0;
    this.vars.enemycheckId = 0;
    this.vars.enemydistance = 0;
    this.vars.furthestenemydist = 0;

    this.watchers.enemycheckId = new Watcher({
      label: "Turret: EnemyCheck#ID",
      style: "normal",
      visible: true,
      value: () => this.vars.enemycheckId,
      x: 245,
      y: 175,
    });
  }

  *whenGreenFlagClicked() {
    this.size = 65;
    this.costume = "costume1";
    this.goto(205, 158);
    this.vars.mouseAction = "none";
    this.stage.vars.canshowradiuscircle = "no";
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        this.vars.mouseAction = "selected";
        while (!(this.touching("mouse") && !this.mouse.down)) {
          yield;
        }
        this.createClone();
      }
      yield;
    }
  }

  *startAsClone() {
    while (true) {
      if (this.toString(this.vars.mouseAction) === "selected") {
        this.stage.vars.canshowradiuscircle = "yes";
        this.goto(this.mouse.x, this.mouse.y);
      } else {
        yield* this.turretaimandshoot();
      }
      yield;
    }
  }

  *startAsClone2() {
    this.size = 75;
    while (true) {
      if (this.mouse.down) {
        while (!!this.mouse.down) {
          yield;
        }
        this.stage.vars.canshowradiuscircle = "no";
        this.vars.mouseAction = "none";
      }
      yield;
    }
  }

  *turretaimandshoot() {
    this.vars.targetenemy = "none";
    this.stage.vars.enemycheck = 0;
    this.vars.furthestenemydist = -999;
    for (let i = 0; i < this.stage.vars.enemyids.length; i++) {
      this.stage.vars.enemycheck++;
      this.vars.enemycheckId = this.itemOf(
        this.stage.vars.enemyids,
        this.stage.vars.enemycheck - 1
      );
      this.warp(this.distancetoenemy)(
        this.itemOf(this.stage.vars.enemyx, this.vars.enemycheckId - 1),
        this.itemOf(this.stage.vars.enemyy, this.vars.enemycheckId - 1)
      );
      if (
        this.compare(this.vars.enemydistance, this.stage.vars.viewradius) < 0 &&
        this.compare(
          this.itemOf(
            this.stage.vars.enemyprogress,
            this.vars.enemycheckId - 1
          ),
          this.vars.furthestenemydist
        ) > 0
      ) {
        this.vars.furthestenemydist = this.itemOf(
          this.stage.vars.enemyprogress,
          this.vars.enemycheckId - 1
        );
        this.vars.targetenemy = this.vars.enemycheckId;
      }
    }
    if (!(this.toString(this.vars.targetenemy) === "none")) {
      if (
        this.compare(
          this.itemOf(this.stage.vars.enemyx, this.vars.targetenemy - 1),
          this.x
        ) > 0
      ) {
        this.direction =
          90 -
          this.radToDeg(
            Math.atan(
              (this.toNumber(
                this.itemOf(this.stage.vars.enemyy, this.vars.targetenemy - 1)
              ) -
                this.y) /
                (this.toNumber(
                  this.itemOf(this.stage.vars.enemyx, this.vars.targetenemy - 1)
                ) -
                  this.x)
            )
          );
      } else {
        this.direction =
          -90 -
          this.radToDeg(
            Math.atan(
              (this.toNumber(
                this.itemOf(this.stage.vars.enemyy, this.vars.targetenemy - 1)
              ) -
                this.y) /
                (this.toNumber(
                  this.itemOf(this.stage.vars.enemyx, this.vars.targetenemy - 1)
                ) -
                  this.x)
            )
          );
      }
    }
  }

  *distancetoenemy(enemyx, enemyy) {
    this.vars.enemydistance = Math.sqrt(
      (this.toNumber(enemyx) - this.x) * (this.toNumber(enemyx) - this.x) +
        (this.toNumber(enemyy) - this.y) * (this.toNumber(enemyy) - this.y)
    );
  }
}
