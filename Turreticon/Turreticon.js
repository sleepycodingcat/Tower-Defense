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
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveOpenshop() {
    this.visible = true;
    this.size = 50;
    this.goto(186, 138);
    this.stage.vars.shopdescription = 0;
    while (true) {
      this.moveAhead();
      if (this.touching("mouse")) {
        this.stage.vars.shopdescription = 1;
        this.effects.brightness = 15;
        if (this.mouse.down && !(this.compare(this.stage.vars.cash, 50) < 0)) {
          while (!!this.mouse.down) {
            yield;
          }
          this.broadcast("CloseShop");
          this.sprites["Turret"].createClone();
          this.stage.vars.cash -= 50;
        }
      } else {
        this.stage.vars.shopdescription = 0;
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *whenIReceiveCloseshop() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
