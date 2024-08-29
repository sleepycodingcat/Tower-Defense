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
      new Costume("1", "./TurretDescription/costumes/1.svg", {
        x: 37.74666167577547,
        y: 23.561624200114068,
      }),
      new Costume("2", "./TurretDescription/costumes/2.svg", {
        x: 37.724021702764475,
        y: 23.267305279673394,
      }),
      new Costume("3", "./TurretDescription/costumes/3.svg", {
        x: 37.72402669348702,
        y: 23.550299739893745,
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
      if (
        this.indexInArray(this.stage.vars.shopdescription, "show") + 1 ===
        0
      ) {
        this.visible = false;
      } else {
        this.visible = true;
        this.costume =
          this.indexInArray(this.stage.vars.shopdescription, "show") + 1;
      }
      yield;
    }
  }

  *whenIReceiveCloseshop() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
