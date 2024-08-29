/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TurretRange extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./TurretRange/costumes/costume1.svg", {
        x: 99.62205882352939,
        y: 99.62205882352944,
      }),
    ];

    this.sounds = [new Sound("pop", "./TurretRange/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
    ];
  }

  *whenIReceiveStartGame() {
    this.visible = false;
    this.effects.ghost = 50;
    while (true) {
      this.size =
        (this.toNumber(
          this.itemOf(
            this.stage.vars.turretviewradius,
            this.stage.vars.selectedturret - 1
          )
        ) /
          100) *
        100;
      this.moveAhead();
      this.moveBehind(10);
      if (this.toString(this.stage.vars.draggingturretonmap) === "yes") {
        this.visible = true;
        this.goto(this.mouse.x, this.mouse.y);
      } else {
        if (this.toNumber(this.stage.vars.selectedturret) === 0) {
          this.visible = false;
        } else {
          this.visible = true;
          this.goto(
            this.toNumber(
              this.itemOf(
                this.stage.vars.turretx,
                this.stage.vars.selectedturret - 1
              )
            ),
            this.toNumber(
              this.itemOf(
                this.stage.vars.turrety,
                this.stage.vars.selectedturret - 1
              )
            )
          );
        }
      }
      yield;
    }
  }
}
