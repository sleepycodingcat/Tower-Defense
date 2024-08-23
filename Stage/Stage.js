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

    this.vars.canshowradiuscircle = "no";
    this.vars.viewradius = 80;
    this.vars.enemycheck = 15;
    this.vars.enemyx = [
      0, 0, 0, 234.87738134804076, 234.87738134804076, 0, 234.87738134804076,
      234.87738134804076, 0, 234.87738134804076, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 5.211836471294718, 5.837574331455642, 0,
      7.089050051777493, -15.697621560410994, -44.288857113978466,
      -62.44702038785509, -83.0377547660613, -112.71605985737096,
      -143.98099814005445, -169.15320764397674, -178.90572816508694,
      -178.90572816508694, -180.78294174556967, -187.61983497887363, -192,
    ];
    this.vars.enemyy = [
      0, 0, 0, -89.25488859098974, -89.25488859098974, 0, -89.25488859098974,
      -89.25488859098974, 0, -89.25488859098974, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 67.38029971130084, 35.42954634892028, 0,
      -28.077987274885224, -47.53964338485408, -34.992490521767316,
      -8.935354049515151, 15.173298363146152, 26.11604302305364,
      21.782101230393344, 2.739010988186827, -27.326021368749934,
      -59.326021368749934, -91.1782814558916, -122.3447264633362, -154,
    ];
    this.vars.enemyprogress = [
      "dead",
      "dead",
      "dead",
      864,
      864,
      "dead",
      864,
      864,
      "dead",
      864,
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
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      "dead",
      500,
      468,
      "dead",
      404,
      372,
      340,
      308,
      276,
      244,
      212,
      180,
      148,
      116,
      84,
      52,
      20,
    ];
    this.vars.enemyids = [
      30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    ];
  }
}
