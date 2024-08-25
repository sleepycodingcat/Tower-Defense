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
    this.vars.wave = 5;
    this.vars.canbeginnextwave = "no";
    this.vars.donespawning = "no";
    this.vars.cash = 8;
    this.vars.canmakeclonesofwave = "no";
    this.vars.shopopen = "no";
    this.vars.shopdescription = 1;
    this.vars.enemyx = [];
    this.vars.enemyy = [];
    this.vars.enemyprogress = [];
    this.vars.enemyids = [];
    this.vars.turretx = [82, -107, 74, -56, 61, 29, -34];
    this.vars.turrety = [-33, -58, 40, -106, 1, 156, 42];
  }
}
