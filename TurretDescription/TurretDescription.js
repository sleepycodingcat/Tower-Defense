/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TurretDescription extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./TurretDescription/costumes/costume1.svg", {
        x: 37.74666167577547,
        y: 23.561624200114068,
      }),
    ];

    this.sounds = [new Sound("pop", "./TurretDescription/sounds/pop.wav")];

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
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(186, -156);
  }

  *whenIReceiveOpenshop() {
    this.visible = true;
    while (true) {
      this.moveAhead();
      if (this.toNumber(this.stage.vars.shopdescription) === 1) {
        this.visible = true;
        this.costume = "costume1";
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveCloseshop() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
