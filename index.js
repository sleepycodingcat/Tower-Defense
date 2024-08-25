import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Enemy from "./Enemy/Enemy.js";
import Line from "./Line/Line.js";
import Path from "./Path/Path.js";
import Turret from "./Turret/Turret.js";
import TurretRange from "./TurretRange/TurretRange.js";
import Base from "./Base/Base.js";
import Turretcollider from "./Turretcollider/Turretcollider.js";
import Placedturretcollider from "./Placedturretcollider/Placedturretcollider.js";
import Screenbg from "./Screenbg/Screenbg.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Enemy: new Enemy({
    x: 0,
    y: 0,
    direction: 114,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 60,
    visible: false,
    layerOrder: 8,
  }),
  Line: new Line({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 6,
  }),
  Path: new Path({
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
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: true,
    layerOrder: 9,
  }),
  TurretRange: new TurretRange({
    x: 73,
    y: 43,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 80,
    visible: false,
    layerOrder: 3,
  }),
  Base: new Base({
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: true,
    layerOrder: 5,
  }),
  Turretcollider: new Turretcollider({
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 4,
  }),
  Placedturretcollider: new Placedturretcollider({
    x: -65.21815858178056,
    y: 42.84524857754882,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 7,
  }),
  Screenbg: new Screenbg({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
