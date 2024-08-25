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
    this.vars.enemycheck = 0;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.wave = 1;
    this.vars.canbeginnextwave = "yes";
    this.vars.donespawning = "yes";
    this.vars.cash = 85;
    this.vars.canmakeclonesofwave = "no";
    this.vars.enemyx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.vars.enemyy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.vars.enemyprogress = [
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
    ];
    this.vars.enemyids = [];
    this.vars.turretx = [-226];
    this.vars.turrety = [-64];
  }
}
