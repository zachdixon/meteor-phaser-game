import React from "react";
import Phaser from "phaser";
import GameScalePlugin from "phaser-plugin-game-scale";

import BootScene from "/imports/phaser/scenes/BootScene";
import MenuScene from "/imports/phaser/scenes/MenuScene";
import GameScene from "/imports/phaser/scenes/GameScene";
import UIScene from "/imports/phaser/scenes/UIScene";

export default class Game extends React.Component {
  componentWillMount() {
    const width = window.innerWidth,
      height = window.innerHeight;
    this.config = {
      type: Phaser.AUTO,
      width,
      height,
      //zoom: 1,
      //resolution: 1,
      //parent: null,
      //canvas: null,
      //canvasStyle: null,
      //seed: null,
      title: "My Phaser Game",
      version: "0.0.1",
      //input: {
      //   keyboard: true,
      //   mouse: true,
      //   touch: true,
      //   gamepad: true
      // },
      //disabledContextMenu: false,
      //banner: false,
      // banner: {
      //hidePhaser: false,
      //text: "white",
      // background: ["#e54661", "#ffa644", "#998a2f", "#2c594f", "#002d40"]
      // },
      // fps: {
      //   min: 10,
      //   target: 60,
      //   forceSetTimeout: false
      // },
      // antialias: false,
      // pixelArt: false,
      // transparent: false,
      // clearBeforeRender: true,
      // backgroundColor: 0x000000, // black
      // loader: {
      // baseURL: '',
      // path: "app/static/assets/"
      // maxParallelDownloads: 32,
      // crossOrigin: 'anonymous',
      // timeout: 0
      // },
      physics: {
        default: "matter",
        matter: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      plugins: {
        global: [
          {
            key: "GameScalePlugin",
            plugin: GameScalePlugin,
            mapping: "gameScale"
          }
        ]
      },
      scene: [BootScene, MenuScene, GameScene, UIScene]
    };
  }

  componentDidMount() {
    this.game = new Phaser.Game(this.config);
  }

  componentWillUnmount() {
    // this.game.destroy(true);
  }

  render() {
    return null;
  }
}
