/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Startwavebuttonsprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "costume1",
        "./Startwavebuttonsprite1/costumes/costume1.svg",
        { x: 40.25, y: 40.25000000000006 }
      ),
    ];

    this.sounds = [new Sound("pop", "./Startwavebuttonsprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "NewWave" },
        this.whenIReceiveNewwave
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Finished wave " },
        this.whenIReceiveFinishedWave
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
    ];
  }

  *whenIReceiveNewwave() {
    this.stage.vars.wave++;
    this.stage.vars.canbeginnextwave = "no";
    this.effects.brightness = -50;
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.touching("mouse")) {
        null;
      } else {
        this.size += 0.2 * (50 - this.size);
        this.effects.color = 0;
      }
      yield;
    }
  }

  *whenIReceiveFinishedWave() {
    this.stage.vars.cash += 25;
  }

  *whenIReceiveStartGame() {
    this.goto(-206, 147);
    this.size = 10;
    yield* this.wait(0.1);
    this.moveAhead();
    this.visible = true;
    this.size = 10;
    this.stage.vars.canbeginnextwave = "yes";
    while (true) {
      if (this.toString(this.stage.vars.canbeginnextwave) === "yes") {
        if (this.touching("mouse")) {
          this.size += 0.2 * (70 - this.size);
          this.effects.color = -10;
          if (this.mouse.down) {
            while (!!this.mouse.down) {
              yield;
            }
            this.broadcast("NewWave");
          }
        } else {
          this.effects.brightness = 0;
        }
      } else {
        if (
          this.toString(this.stage.vars.donespawning) === "yes" &&
          this.stage.vars.enemyids.length === 0
        ) {
          this.broadcast("Finished wave ");
          this.stage.vars.canbeginnextwave = "yes";
        }
      }
      yield;
    }
  }
}
