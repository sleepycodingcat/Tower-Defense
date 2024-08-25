/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ShopBackground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./ShopBackground/costumes/costume1.svg", {
        x: 59.383331298828125,
        y: 191.5,
      }),
    ];

    this.sounds = [new Sound("pop", "./ShopBackground/sounds/pop.wav")];

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
    this.goto(185, 0);
    this.effects.ghost = 10;
    this.moveAhead();
    this.moveBehind(2);
  }

  *whenIReceiveCloseshop() {
    this.visible = false;
  }
}
