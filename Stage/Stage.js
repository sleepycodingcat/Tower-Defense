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

    this.vars.enemycheck = 1;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.wave = 4;
    this.vars.canbeginnextwave = "no";
    this.vars.donespawning = "no";
    this.vars.cash = 285;
    this.vars.canmakeclonesofwave = "no";
    this.vars.shopopen = "no";
    this.vars.currentturretbeingbought = "double";
    this.vars.laserdamage = 18;
    this.vars.enemyx = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -192,
    ];
    this.vars.enemyy = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -162,
    ];
    this.vars.enemyprogress = [
      8, 8, 8, 8, 8, 8, 10, 12, 14, 16, 18, 20, 20, 22, 20, 20, 8, 8, 8, 8,
    ];
    this.vars.enemyids = [20];
    this.vars.turretx = [-117, -212, -119, -136, -227, -130, -224, -235, -138];
    this.vars.turrety = [-65, 53, 85, -140, -74, -17, 3, -136, -104];
    this.vars.turrettypes = ["normal", "double", "laser"];
    this.vars.turretviewradius = [130, 130, 130, 130, 80, 110, 80, 110, 80];
    this.vars.shopdescription = ["hide", "show", "hide"];
    this.vars.turretcosts = [50, 100, 150];
    this.vars.enemyhealth = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ];
    this.vars.maxenemyhealth = [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    ];
    this.vars.laserx = [];
    this.vars.lasery = [];
    this.vars.laserdirection = [];
  }
}
