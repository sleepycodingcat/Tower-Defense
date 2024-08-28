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

    this.vars.enemycheck = 0;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.wave = 1;
    this.vars.canbeginnextwave = "yes";
    this.vars.donespawning = "yes";
    this.vars.cash = 125;
    this.vars.canmakeclonesofwave = "no";
    this.vars.shopopen = "no";
    this.vars.currentturretbeingbought = "double";
    this.vars.enemyx = [
      240.53882293954203, 240.53882293954203, 240.53882293954203,
      240.53882293954203, 240.53882293954203, 240.53882293954203,
      240.53882293954203, 240.53882293954203, 240.53882293954203,
      240.53882293954203,
    ];
    this.vars.enemyy = [
      -93.29074745993263, -93.29074745993263, -93.29074745993263,
      -93.29074745993263, -93.29074745993263, -93.29074745993263,
      -93.29074745993263, -93.29074745993263, -93.29074745993263,
      -93.29074745993263,
    ];
    this.vars.enemyprogress = [
      870, 870, 870, 870, 870, 870, 870, 870, 870, 870,
    ];
    this.vars.enemyids = [];
    this.vars.turretx = [];
    this.vars.turrety = [];
    this.vars.turrettypes = ["normal", "double"];
    this.vars.turretviewradius = [];
    this.vars.shopdescription = ["hide", "hide"];
    this.vars.turretcosts = [50, 100];
  }
}
