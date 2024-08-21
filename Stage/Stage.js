/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 253.26126,
        y: 192.98528999999994,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.canshowradiuscircle = "no";
    this.vars.viewradius = 100;
    this.vars.enemycheck = 0;
    this.vars.enemyx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.vars.enemyy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.vars.enemyprogress = [
      856, 856, 856, 856, 856, 856, 856, 856, 856, 856,
    ];
    this.vars.enemyids = [];

    this.watchers.enemycheck = new Watcher({
      label: "EnemyCheck#",
      style: "normal",
      visible: true,
      value: () => this.vars.enemycheck,
      x: 245,
      y: 149,
    });
  }
}
