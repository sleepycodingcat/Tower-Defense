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
    this.vars.enemycheck = 23;
    this.vars.selectedturret = 0;
    this.vars.draggingturretonmap = "no";
    this.vars.enemyx = [
      -155.57324276529295, -177.23990489831112, -178.9763866749804,
      -182.44935022831896, -189.39527733499608,
    ];
    this.vars.enemyy = [
      16.079735440927788, -16.29134099396235, -56.139418524084434,
      -95.8355735843286, -135.22788370481692,
    ];
    this.vars.enemyprogress = [200, 160, 120, 80, 40];
    this.vars.enemyids = [1, 2, 3, 4, 5];
    this.vars.turretx = [];
    this.vars.turrety = [];

    this.watchers.selectedturret = new Watcher({
      label: "SelectedTurret#",
      style: "normal",
      visible: true,
      value: () => this.vars.selectedturret,
      x: 251,
      y: 130,
    });
    this.watchers.draggingturretonmap = new Watcher({
      label: "DraggingTurretOnMap",
      style: "normal",
      visible: true,
      value: () => this.vars.draggingturretonmap,
      x: 245,
      y: 175,
    });
  }
}
