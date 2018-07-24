import Phaser from "phaser";
import Styles from "/imports/constants/styles";
import {
  UP,
  LEFT,
  DOWN,
  RIGHT,
  NORTH_EAST,
  NORTH_WEST,
  SOUTH_EAST,
  SOUTH_WEST
} from "/imports/constants/directions";
import { IMAGE_PLAYER } from "/imports/constants/assets";
const Rectangle = Phaser.Geom.Rectangle;
const PLAYER_ANIMS = [
  { key: UP, start: 9, end: 11 },
  { key: NORTH_EAST, start: 9, end: 11 },
  { key: RIGHT, start: 6, end: 8 },
  { key: SOUTH_EAST, start: 15, end: 17 },
  { key: DOWN, start: 0, end: 2 },
  { key: SOUTH_WEST, start: 12, end: 14 },
  { key: LEFT, start: 3, end: 5 },
  { key: NORTH_WEST, start: 18, end: 20 }
];

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
    this.progressBar = null;
    this.progressBgRect = null;
    this.progressRect = null;
  }

  preload() {
    this.load.on("progress", this.onLoadProgress, this);
    this.load.on("complete", this.onLoadComplete, this);
    this.createProgressBar();
    this.load.image("cliffsTiles", "/assets/tilesets/cliffs.png");
    this.load.image("groundTiles", "/assets/tilesets/ground-extruded.png");
    this.load.image("objectTiles", "/assets/tilesets/objects.png");
    this.load.image("treesTiles", "/assets/tilesets/trees.png");
    this.load.tilemapTiledJSON("map001", "/assets/tilemaps/map001.json");
    this.load.image("sky", "/assets/sky.png");
    this.load.image("ground", "/assets/ground.png");
    this.load.image("star", "/assets/star.png");
    this.load.image("bomb", "/assets/bomb.png");
    this.load.spritesheet(IMAGE_PLAYER, "/assets/player.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.gameScale.setMode("resize-and-fit");
    const scaleRatio = window.devicePixelRatio / 3;
    this.registry.set("scaleRatio", scaleRatio);
    this.registry.set("score", 0);
    this.createAnims();
    this.scene.transition({ target: "menu" });
  }

  // extend:

  createAnims = () => {
    PLAYER_ANIMS.forEach(anim => {
      const { key, start, end } = anim;
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(IMAGE_PLAYER, {
          start,
          end
        }),
        frameRate: 13,
        repeat: -1
      });
    });
  };

  createProgressBar() {
    const main = this.cameras.main;
    this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50);
    Rectangle.CenterOn(
      this.progressBgRect,
      0.5 * main.width,
      0.5 * main.height
    );
    this.progressRect = Rectangle.Clone(this.progressBgRect);
    this.progressBar = this.add.graphics();
  }

  onLoadComplete(loader, totalComplete, totalFailed) {
    console.debug("complete", totalComplete);
    console.debug("failed", totalFailed);
    this.progressBar.destroy();
  }

  onLoadProgress(progress) {
    console.debug("progress", progress);
    this.progressRect.width = progress * this.progressBgRect.width;
    this.progressBar
      .clear()
      .fillStyle(Styles.hexColors.darkGray)
      .fillRectShape(this.progressBgRect)
      .fillStyle(
        this.load.totalFailed ? Styles.hexColors.red : Styles.hexColors.white
      )
      .fillRectShape(this.progressRect);
  }
}
