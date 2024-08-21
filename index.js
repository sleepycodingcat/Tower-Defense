import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Enemy from "./Enemy/Enemy.js";
import Line from "./Line/Line.js";
import Turret from "./Turret/Turret.js";
import TurretRange from "./TurretRange/TurretRange.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Enemy: new Enemy({
    x: 240,
    y: -180,
    direction: 114,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 60,
    visible: false,
    layerOrder: 2,
  }),
  Line: new Line({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1,
  }),
  Turret: new Turret({
    x: 205,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 65,
    visible: true,
    layerOrder: 3,
  }),
  TurretRange: new TurretRange({
    x: 70,
    y: 37,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
