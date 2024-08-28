/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Turreticon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Turreticon/costumes/costume1.svg", {
        x: 30.625,
        y: 30.625010000000003,
      }),
      new Costume("costume2", "./Turreticon/costumes/costume2.svg", {
        x: 30.625,
        y: 30.625009999999975,
      }),
    ];

    this.sounds = [new Sound("pop", "./Turreticon/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "OpenShop" },
        this.whenIReceiveOpenshop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "CloseShop" },
        this.whenIReceiveCloseshop
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];

    this.vars.shopiconclone = 2;
    this.vars.isoriginalsprite = "yes";
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.shopdescription = [];
    this.stage.vars.turretcosts = [];
    this.vars.shopiconclone = 0;
    this.vars.isoriginalsprite = "no";
    this.stage.vars.turrettypes = [];
    for (let i = 0; i < 2; i++) {
      this.vars.shopiconclone++;
      this.createClone();
      this.stage.vars.shopdescription.push("hide");
      yield;
    }
    this.vars.isoriginalsprite = "yes";
  }

  *whenIReceiveOpenshop() {
    if (this.toString(this.vars.isoriginalsprite) === "no") {
      this.visible = true;
      this.size = 50;
      while (true) {
        this.moveAhead();
        if (this.touching("mouse")) {
          this.stage.vars.shopdescription.splice(
            this.vars.shopiconclone - 1,
            1,
            "show"
          );
          this.effects.brightness = 15;
          if (
            this.mouse.down &&
            !(
              this.compare(
                this.stage.vars.cash,
                this.itemOf(
                  this.stage.vars.turretcosts,
                  this.vars.shopiconclone - 1
                )
              ) < 0
            )
          ) {
            while (!!this.mouse.down) {
              yield;
            }
            this.broadcast("CloseShop");
            this.stage.vars.currentturretbeingbought = this.itemOf(
              this.stage.vars.turrettypes,
              this.vars.shopiconclone - 1
            );
            this.sprites["Turret"].createClone();
            this.stage.vars.cash +=
              this.toNumber(
                this.itemOf(
                  this.stage.vars.turretcosts,
                  this.vars.shopiconclone - 1
                )
              ) * -1;
          }
        } else {
          this.stage.vars.shopdescription.splice(
            this.vars.shopiconclone - 1,
            1,
            "hide"
          );
          this.effects.brightness = 0;
        }
        yield;
      }
    }
  }

  *whenIReceiveCloseshop() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *startAsClone() {
    if (this.toNumber(this.vars.shopiconclone) === 1) {
      this.goto(186, 138);
      this.costume = "costume1";
      this.stage.vars.turrettypes.push("normal");
      this.stage.vars.turretcosts.push(50);
    } else {
      if (this.toNumber(this.vars.shopiconclone) === 2) {
        this.goto(186, 80);
        this.costume = "costume2";
        this.stage.vars.turrettypes.push("double");
        this.stage.vars.turretcosts.push(100);
      } else {
        null;
      }
    }
  }
}
