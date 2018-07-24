import Phaser from "phaser";
import Styles from "/imports/constants/styles";
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  init(data) {
    console.debug("init", this.scene.key, data, this);
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.sky = this.add
      .image(0, 0, "sky")
      .setOrigin(0, 0)
      .setAlpha(0.5)
      .setDisplaySize(width, height);
    this.startText = this.add
      .text(width / 2, height / 2, "START", {
        fill: Styles.colors.white,
        fontFamily: Styles.fonts.default,
        fontSize: 48
      })
      .setOrigin(0.5)
      .setShadow(0, 1, Styles.colors.aqua, 10);
    this.scoreText = this.add
      .text(
        width / 2,
        height - height / 3,
        "Last Score: " + this.registry.get("score"),
        {
          fill: Styles.colors.gold,
          fontFamily: Styles.fonts.default,
          fontSize: 24
        }
      )
      .setOrigin(0.5)
      .setShadow(0, 1, Styles.colors.black, 5);

    this.input.on("pointerup", this.start, this);
  }

  // extend:

  start() {
    this.scene.pause("menu");
    this.scene.start("game");
    this.scene.start("ui");
  }
}
