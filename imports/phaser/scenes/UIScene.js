import { Meteor } from "meteor/meteor";
import Phaser from "phaser";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "ui" });
  }

  create() {
    let logoutText = this.add.text(0, 0, "Quit");
    logoutText.setInteractive();
    this.input.on("gameobjectdown", this.objectClicked);
  }

  objectClicked(pointer, object) {
    this.scene.sys.game.destroy(true);
    // document.getElementsByTagName("canvas")[0].remove();
    // Meteor.logout(() => {
    // window.location = "/";
    // });
  }
}
