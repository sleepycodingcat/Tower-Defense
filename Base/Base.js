/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Base extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("normal", "./Base/costumes/normal.svg", {
        x: 30.625,
        y: 30.625,
      }),
      new Costume("double", "./Base/costumes/double.svg", {
        x: 30.625,
        y: 30.625009999999975,
      }),
      new Costume("laser", "./Base/costumes/laser.svg", {
        x: 30.625,
        y: 30.625010000000003,
      }),
    ];

    this.sounds = [new Sound("pop", "./Base/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlaceTurret" },
        this.whenIReceivePlaceturret
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
    ];

    this.vars.mouseaction = "none";
  }

  *startAsClone() {
    this.visible = true;
    this.size = 50;
    this.vars.mouseaction = "selected";
    this.costume = this.stage.vars.currentturretbeingbought;
    while (true) {
      this.moveAhead();
      this.moveBehind(7);
      if (this.toString(this.vars.mouseaction) === "selected") {
        this.goto(this.mouse.x, this.mouse.y);
      }
      yield;
    }
  }

  *whenIReceivePlaceturret() {
    this.vars.mouseaction = "none";
  }

  *whenIReceiveStartGame() {
    this.size = 40;
    this.moveBehind();
    this.visible = false;
    this.goto(196, 158);
  }
}
