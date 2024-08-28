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
      new Costume("normal", "./Turret/costumes/normal.svg", {
        x: 20.12499999999997,
        y: 20.125,
      }),
      new Costume("costume2", "./Turret/costumes/costume2.svg", {
        x: 20.125,
        y: 20.125,
      }),
      new Costume("double", "./Turret/costumes/double.svg", {
        x: 20.125,
        y: 20.125,
      }),
      new Costume("costume4", "./Turret/costumes/costume4.svg", {
        x: 20.125,
        y: 20.125,
      }),
      new Costume("costume5", "./Turret/costumes/costume5.svg", {
        x: 20.125,
        y: 23.089526736380236,
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

    this.vars.mouseAction = "none";
    this.vars.targetenemy = 0;
    this.vars.enemycheckId = 0;
    this.vars.enemydistance = 0;
    this.vars.furthestenemydist = 0;
    this.vars.canshoot = 0;
    this.vars.isoriginalsprite = "yes";
    this.vars.turretclone = 0;
    this.vars.turrettype = 0;
    this.vars.turretreload = 0;
    this.vars.viewradius = 0;
    this.vars.damage = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 40;
    this.costume = "normal";
    this.goto(196, 158);
    this.vars.mouseAction = "none";
    this.vars.isoriginalsprite = "yes";
    this.vars.turretclone = 0;
    this.stage.vars.draggingturretonmap = "no";
    this.stage.vars.selectedturret = 0;
    this.stage.vars.turretx = [];
    this.stage.vars.turrety = [];
    this.stage.vars.turretviewradius = [];
  }

  *startAsClone() {
    yield* this.buyturret();
    this.vars.canshoot = "no";
    this.vars.isoriginalsprite = "no";
    this.size = 50;
    while (true) {
      if (this.toString(this.vars.mouseAction) === "selected") {
        this.stage.vars.selectedturret = this.vars.turretclone;
        this.goto(this.mouse.x, this.mouse.y);
      } else {
        yield* this.turretaimandshoot();
        if (this.toString(this.vars.canshoot) === "yes") {
          yield* this.shootanimation();
          yield* this.wait(this.toNumber(this.vars.turretreload));
        }
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
        this.compare(this.vars.enemydistance, this.vars.viewradius) < 0 &&
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
    if (
      this.toString(this.vars.isoriginalsprite) === "no" &&
      this.toString(this.vars.mouseAction) === "selected"
    ) {
      this.vars.mouseAction = "none";
      this.stage.vars.selectedturret = 0;
      this.stage.vars.draggingturretonmap = "no";
      this.stage.vars.turretx.push(this.x);
      this.stage.vars.turrety.push(this.y);
    }
  }

  *startAsClone2() {
    while (true) {
      this.moveAhead();
      this.moveBehind(5);
      yield* this.checkturretdetails();
      yield;
    }
  }

  *checkturretdetails() {
    if (this.mouse.down && this.touching("mouse")) {
      this.stage.vars.selectedturret = this.vars.turretclone;
    }
  }

  *buyturret() {
    this.visible = true;
    this.vars.turrettype = this.stage.vars.currentturretbeingbought;
    this.costume = this.vars.turrettype;
    if (this.toString(this.vars.turrettype) === "normal") {
      this.vars.turretreload = 0.4;
      this.vars.viewradius = 110;
      this.vars.damage = 1;
    } else {
      if (this.toString(this.vars.turrettype) === "double") {
        this.vars.turretreload = 0.2;
        this.vars.viewradius = 80;
        this.vars.damage = 1;
      } else {
        null;
      }
    }
    this.vars.mouseAction = "selected";
    this.stage.vars.draggingturretonmap = "yes";
    this.vars.turretclone = this.stage.vars.turretx.length + 1;
    this.stage.vars.turretviewradius.push(this.vars.viewradius);
    this.sprites["Base"].createClone();
    this.sprites["Turretcollider"].createClone();
    this.sprites["Placedturretcollider"].createClone();
  }

  *shootanimation() {
    yield* this.dealDamage();
    if (this.toString(this.vars.turrettype) === "normal") {
      this.costume = "costume2";
      yield* this.wait(0.1);
      this.costume = "normal";
    } else {
      if (this.toString(this.vars.turrettype) === "double") {
        this.costume = "costume4";
        yield* this.wait(0.05);
        this.costume = "double";
        yield* this.wait(0.15);
        yield* this.turretaimandshoot();
        if (this.toString(this.vars.canshoot) === "yes") {
          yield* this.dealDamage();
          this.costume = "costume5";
          yield* this.wait(0.05);
          this.costume = "double";
        }
      } else {
        null;
      }
    }
  }

  *dealDamage() {
    this.stage.vars.enemyhealth.splice(
      this.vars.targetenemy - 1,
      1,
      this.toNumber(
        this.itemOf(this.stage.vars.enemyhealth, this.vars.targetenemy - 1)
      ) - 1
    );
  }
}
