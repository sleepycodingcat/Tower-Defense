/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MainMenu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Play Button", "./MainMenu/costumes/Play Button.svg", {
        x: 70.66666666666666,
        y: 9.661141633433772,
      }),
    ];

    this.sounds = [new Sound("pop", "./MainMenu/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Main Menu" },
        this.whenIReceiveMainMenu
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
    ];
  }

  *whenIReceiveMainMenu() {
    yield* this.wait(0.1);
    this.moveAhead();
    this.visible = true;
    this.size = 10;
    this.goto(0, -33);
    while (true) {
      if (this.touching("mouse")) {
        this.size += 0.2 * (110 - this.size);
      } else {
        this.size += 0.2 * (100 - this.size);
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.broadcast("Main Menu");
  }

  *whenthisspriteclicked() {
    this.visible = false;
    this.broadcast("Start Game");
  }
}
