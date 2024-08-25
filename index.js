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
import Startwavebuttonsprite1 from "./Startwavebuttonsprite1/Startwavebuttonsprite1.js";
import Wave from "./Wave/Wave.js";
import Wave2 from "./Wave2/Wave2.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Enemy: new Enemy({
    x: 0,
    y: 0,
    direction: 114,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 60,
    visible: false,
    layerOrder: 7,
  }),
  Line: new Line({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5,
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
    layerOrder: 10,
  }),
  TurretRange: new TurretRange({
    x: -122,
    y: -36,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 80,
    visible: false,
    layerOrder: 11,
  }),
  Base: new Base({
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: true,
    layerOrder: 4,
  }),
  Turretcollider: new Turretcollider({
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 3,
  }),
  Placedturretcollider: new Placedturretcollider({
    x: -65.21815858178056,
    y: 42.84524857754882,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: true,
    layerOrder: 6,
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
  Startwavebuttonsprite1: new Startwavebuttonsprite1({
    x: -206,
    y: 147,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50.4,
    visible: true,
    layerOrder: 12,
  }),
  Wave: new Wave({
    x: -146,
    y: 145,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8,
  }),
  Wave2: new Wave2({
    x: 239,
    y: 149,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 10,
    size: 45,
    visible: false,
    layerOrder: 9,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
