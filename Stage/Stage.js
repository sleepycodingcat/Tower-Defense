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
        y: 192.98528999999988,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.enemycheck = 0;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.wave = 2;
    this.vars.canbeginnextwave = "yes";
    this.vars.donespawning = "yes";
    this.vars.cash = 112;
    this.vars.canmakeclonesofwave = "no";
    this.vars.shopopen = "no";
    this.vars.currentturretbeingbought = "double";
    this.vars.enemyx = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ];
    this.vars.enemyy = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ];
    this.vars.enemyprogress = [
      16, 18, 18, 6, 10, 26, 56, 86, 108, 108, 106, 104, 102, 104, 102, 104,
      104, 104, 856, 856, 108, 96, 858, 66, 42, 30, 6, 6, 26, 51, 73, 96,
    ];
    this.vars.enemyids = [];
    this.vars.turretx = [-126];
    this.vars.turrety = [-123];
    this.vars.turrettypes = ["normal", "double"];
    this.vars.turretviewradius = [80];
    this.vars.shopdescription = ["hide", "show"];
    this.vars.turretcosts = [50, 100];
    this.vars.enemyhealth = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ];
    this.vars.maxenemyhealth = [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
      1, 1, 1, 4, 4, 4, 4,
    ];
  }
}
