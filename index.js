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
import Wavewave2 from "./Wavewave2/Wavewave2.js";
import Wave from "./Wave/Wave.js";
import Cash from "./Cash/Cash.js";
import ShopButton from "./ShopButton/ShopButton.js";
import ShopBackground from "./ShopBackground/ShopBackground.js";
import Turreticon from "./Turreticon/Turreticon.js";
import TurretDescription from "./TurretDescription/TurretDescription.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Enemy: new Enemy({
    x: 0,
    y: 0,
    direction: 114,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 5,
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
    direction: 51.12693300549408,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 11,
  }),
  TurretRange: new TurretRange({
    x: -126,
    y: -123,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 2.509484277546449,
    visible: false,
    layerOrder: 13,
  }),
  Base: new Base({
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 3,
  }),
  Turretcollider: new Turretcollider({
    x: 196,
    y: 158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 2,
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
    layerOrder: 4,
  }),
  Startwavebuttonsprite1: new Startwavebuttonsprite1({
    x: -206,
    y: 147,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50.39999999999999,
    visible: true,
    layerOrder: 16,
  }),
  Wavewave2: new Wavewave2({
    x: -146,
    y: 145,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 10,
  }),
  Wave: new Wave({
    x: 130,
    y: 147,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 10,
    size: 45,
    visible: false,
    layerOrder: 8,
  }),
  Cash: new Cash({
    x: -60,
    y: 105,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 11,
    size: 30,
    visible: false,
    layerOrder: 9,
  }),
  ShopButton: new ShopButton({
    x: 228,
    y: 150,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 12,
  }),
  ShopBackground: new ShopBackground({
    x: 185,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 15,
  }),
  Turreticon: new Turreticon({
    x: 186,
    y: 138,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 50,
    visible: false,
    layerOrder: 14,
  }),
  TurretDescription: new TurretDescription({
    x: 186,
    y: -156,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 17,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
