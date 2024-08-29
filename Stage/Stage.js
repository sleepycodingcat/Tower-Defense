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

    this.sounds = [
      new Sound("1", "./Stage/sounds/1.wav"),
      new Sound("2", "./Stage/sounds/2.wav"),
      new Sound("3", "./Stage/sounds/3.wav"),
      new Sound("4", "./Stage/sounds/4.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.enemycheck = 0;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.wave = 3;
    this.vars.canbeginnextwave = "yes";
    this.vars.donespawning = "yes";
    this.vars.cash = 196;
    this.vars.canmakeclonesofwave = "no";
    this.vars.shopopen = "no";
    this.vars.currentturretbeingbought = "double";
    this.vars.laserdamage = 18;
    this.vars.music = 4;
    this.vars.enemyx = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ];
    this.vars.enemyy = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ];
    this.vars.enemyprogress = [
      36, 56, 78, 100, 120, 86, 108, 74, 96, 118, 84, 106, 72, 94, 116, 78, 90,
      114, 66, 108, 84, 84, 120, 138, 102, 96, 78, 120, 138, 96, 102, 72, 114,
      72, 90, 108, 66, 108, 72, 78, 108, 48, 90, 78, 66, 19, 21, 23, 24, 26, 29,
      31, 32, 34, 35,
    ];
    this.vars.enemyids = [];
    this.vars.turretx = [-126, -223, -201];
    this.vars.turrety = [-140, -41, 41];
    this.vars.turrettypes = ["normal", "double", "laser"];
    this.vars.turretviewradius = [130, 110, 80];
    this.vars.shopdescription = ["hide", "show", "hide"];
    this.vars.turretcosts = [50, 100, 150];
    this.vars.enemyhealth = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, -18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    this.vars.maxenemyhealth = [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8,
    ];
    this.vars.laserx = [
      -126, -126, -126, -126, -126, -126, -126, -126, -126, -126, -126, -126,
      -126, -126, -126, -126, -126, -126, -126, -126, -126, -126, -126, -126,
      -126, -126, -126, -126, -126, -126, -126,
    ];
    this.vars.lasery = [
      -140, -140, -140, -140, -140, -140, -140, -140, -140, -140, -140, -140,
      -140, -140, -140, -140, -140, -140, -140, -140, -140, -140, -140, -140,
      -140, -140, -140, -140, -140, -140, -140,
    ];
    this.vars.laserdirection = [
      -90.04711942204021, -72.34392875196906, -54.11995251775959,
      -40.119156456503255, -32.489192788271026, -36.68276203934046,
      -42.1696352503283, -33.12804422878301, -37.473728586881904,
      -43.33000999942571, -33.789497720018765, -58.670790192302135,
      -37.163922652132946, -49.0901884331872, -32.90448205240844,
      -45.58781490401388, -69.06682482391113, -42.45968905089276,
      -69.06682482391113, -42.45968905089276, -63.8010587763191,
      -101.97613244420336, -100.32317046349083, -98.64731576544565,
      -97.8015592613353, -96.09601216366546, -93.52059062360803,
      -91.78685917810716, -90.91437874523614, -89.16010914568086,
      -88.27911430850483,
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.vars.music = this.random(1, 4);
      yield* this.playSoundUntilDone(this.vars.music);
      if (
        this.toNumber(this.vars.music) === 2 ||
        this.toNumber(this.vars.music) === 3
      ) {
        yield* this.playSoundUntilDone(this.vars.music);
      }
      yield;
    }
  }
}
