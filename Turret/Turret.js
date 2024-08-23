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
        x: 20.12499999999997,
        y: 20.125,
      }),
      new Costume("costume2", "./Turret/costumes/costume2.svg", {
        x: 20.125,
        y: 20.125,
      }),
    ];

    this.sounds = [new Sound("pop", "./Turret/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlaceTurret" },
        this.whenIReceivePlaceturret
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];

    this.vars.mouseAction = "no";
    this.vars.targetenemy = 0;
    this.vars.enemycheckId = 0;
    this.vars.enemydistance = 0;
    this.vars.furthestenemydist = 0;
    this.vars.canshoot = 0;
  }

  *whenGreenFlagClicked() {
    this.size = 40;
    this.costume = "costume1";
    this.goto(196, 158);
    this.vars.mouseAction = "none";
    this.stage.vars.canshowradiuscircle = "no";
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        this.vars.mouseAction = "selected";
        while (!(this.touching("mouse") && !this.mouse.down)) {
          yield;
        }
        this.createClone();
        this.sprites["Base"].createClone();
        this.sprites["Turretcollider"].createClone();
        this.sprites["Placedturretcollider"].createClone();
      }
      yield;
    }
  }

  *startAsClone() {
    this.vars.canshoot = "no";
    this.size = 50;
    while (true) {
      if (this.toString(this.vars.mouseAction) === "selected") {
        this.stage.vars.canshowradiuscircle = "yes";
        this.goto(this.mouse.x, this.mouse.y);
      } else {
        yield* this.turretaimandshoot();
      }
      if (this.toString(this.vars.canshoot) === "yes") {
        this.stage.vars.enemyprogress.splice(
          this.vars.targetenemy - 1,
          1,
          "dead"
        );
        this.costume = "costume2";
        yield* this.wait(0.05);
        this.costume = "costume1";
        yield* this.wait(0.6);
      }
      yield;
    }
  }

  *turretaimandshoot() {
    this.vars.canshoot = "no";
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
      this.vars.canshoot = "yes";
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

  *whenIReceivePlaceturret() {
    this.stage.vars.canshowradiuscircle = "no";
    this.vars.mouseAction = "no";
  }

  *startAsClone2() {
    while (true) {
      this.moveAhead();
      this.moveBehind(1);
      yield;
    }
  }
}
