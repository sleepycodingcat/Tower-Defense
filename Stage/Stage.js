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
        y: 192.9852899999999,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.viewradius = 80;
    this.vars.enemycheck = 3;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.wave = 2;
    this.vars.canbeginnextwave = "no";
    this.vars.donespawning = "no";
    this.vars.enemyx = [0, 0, 0, -182.2981636497013, -189.73527730421773, -192];
    this.vars.enemyy = [0, 0, 0, -96.9705122145588, -130.11410113595727, -164];
    this.vars.enemyprogress = ["dead", "dead", "dead", 76, 42, 8];
    this.vars.enemyids = [4, 5, 6];
    this.vars.turretx = [-49, 59, -122];
    this.vars.turrety = [74, 53, -36];
  }
}
