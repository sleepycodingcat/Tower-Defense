/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ShopButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./ShopButton/costumes/costume1.svg", {
        x: 11.875,
        y: 20.875,
      }),
    ];

    this.sounds = [new Sound("pop", "./ShopButton/sounds/pop.wav")];

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
    this.visible = true;
    this.goto(228, 150);
    this.direction = 90;
    this.stage.vars.shopopen = "no";
    while (true) {
      if (this.touching("mouse")) {
        this.effects.brightness = 30;
        if (this.mouse.down) {
          if (this.toString(this.stage.vars.shopopen) === "no") {
            this.broadcast("OpenShop");
          } else {
            this.broadcast("CloseShop");
          }
        }
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *whenIReceiveOpenshop() {
    this.direction = -90;
    this.goto(116, 144);
    this.stage.vars.shopopen = "yes";
  }

  *whenIReceiveCloseshop() {
    this.goto(228, 150);
    this.stage.vars.shopopen = "no";
    this.direction = 90;
  }
}
