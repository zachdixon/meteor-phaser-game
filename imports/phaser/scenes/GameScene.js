import Phaser from "phaser";
import { IMAGE_PLAYER } from "/imports/constants/assets";
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

const { Bodies, Body } = Phaser.Physics.Matter.Matter;
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {}

  create() {
    let _this = this;
    this.map = this.make.tilemap({ key: "map001" });
    let cliffsTileset = this.map.addTilesetImage("cliffs", "cliffsTiles"),
      groundTileset = this.map.addTilesetImage("ground", "groundTiles"),
      objectTileset = this.map.addTilesetImage("objects", "objectTiles"),
      treesTileset = this.map.addTilesetImage("trees", "treesTiles");

    let groundLayer = this.map.createStaticLayer("Ground", groundTileset),
      ground1Layer = this.map.createStaticLayer("Ground1", groundTileset),
      cliffsLayer = this.map.createStaticLayer("Cliffs", cliffsTileset),
      nsPathsLayer = this.map.createStaticLayer("N/S Paths", groundTileset),
      ewPathsLayer = this.map.createStaticLayer("E/W Paths", groundTileset),
      treesLayer = this.map
        .createStaticLayer("Trees", treesTileset)
        .setDepth(10);
    this.map.createFromObjects("Objects");
    treesLayer.setCollisionByProperty({ collides: true });
    cliffsLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(treesLayer, { label: "Tree" });
    this.matter.world.convertTilemapLayer(cliffsLayer, { label: "Cliff" });

    this.matter.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
    this.player = this.matter.add.sprite(100, 450, IMAGE_PLAYER);
    let playerHead = Bodies.rectangle(
      0,
      0,
      this.player.width * 0.75,
      this.player.height / 2,
      { label: "Player Head", isSensor: true, chamfer: { radius: 10 } }
    );
    let playerBody = Bodies.rectangle(
      0,
      this.player.height / 2,
      this.player.width * 0.75,
      this.player.height / 2,
      { chamfer: { radius: 10 } }
    );
    let compoundBody = Body.create({
      parts: [playerHead, playerBody],
      friction: 0.002,
      sleepThreshold: Infinity
    });
    this.player.setExistingBody(compoundBody).setFixedRotation();

    this.map.findObject("Objects", object => {
      object.name === "Player Spawn" &&
        this.player.setPosition(object.x, object.y);
    });
    this.player.speed = 3;
    // this.player.body.velocity.normalize().scale(this.player.speed);
    this.cameras.main
      .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .startFollow(this.player);

    this.matter.world.on("collisionactive", event => {
      this.setPlayerDepth(event.pairs);
    });
    this.matter.world.on("afterupdate", event => {
      this.setPlayerDepth(event.source.pairs.collisionActive);
    });
  }

  setPlayerDepth(collisionPairs) {
    let playerDepth = 1;
    if (collisionPairs && collisionPairs.length) {
      for (var i = 0; i < collisionPairs.length; i++) {
        var bodyA = collisionPairs[i].bodyA;
        var bodyB = collisionPairs[i].bodyB;
        if (
          (bodyA.label === "Tree" || bodyB.label === "Tree") &&
          (bodyA.label === "Player Head" || bodyB.label === "Player Head")
        ) {
          playerDepth = 11;
        }
      }
    }
    this.player.setDepth(playerDepth);
  }

  getPlayerDirection = () => {
    const { left, right, up, down } = this.cursors;
    const { W, A, S, D } = this.keys;
    let isLeft = left.isDown || A.isDown,
      isRight = right.isDown || D.isDown,
      isUp = up.isDown || W.isDown,
      isDown = down.isDown || S.isDown;

    if (isUp && isRight) return NORTH_EAST;
    if (isUp && isLeft) return NORTH_WEST;
    if (isDown && isRight) return SOUTH_EAST;
    if (isDown && isLeft) return SOUTH_WEST;
    if (isLeft) return LEFT;
    if (isRight) return RIGHT;
    if (isUp) return UP;
    if (isDown) return DOWN;
    return false;
  };

  update() {
    let v = this.player.speed,
      diagonalV = v * 0.8;
    switch (this.getPlayerDirection()) {
      case UP:
        this.player.y -= v;
        this.player.anims.play(UP, true);
        break;
      case NORTH_EAST:
        this.player.x += diagonalV;
        this.player.y -= diagonalV;
        this.player.anims.play(NORTH_EAST, true);
        break;
      case RIGHT:
        this.player.x += v;
        this.player.anims.play(RIGHT, true);
        break;
      case SOUTH_EAST:
        this.player.x += diagonalV;
        this.player.y += diagonalV;
        this.player.anims.play(SOUTH_EAST, true);
        break;
      case DOWN:
        this.player.y += v;
        this.player.anims.play(DOWN, true);
        break;
      case SOUTH_WEST:
        this.player.x -= diagonalV;
        this.player.y += diagonalV;
        this.player.anims.play(SOUTH_WEST, true);
        break;
      case LEFT:
        this.player.x -= v;
        this.player.anims.play(LEFT, true);
        break;
      case NORTH_WEST:
        this.player.x -= diagonalV;
        this.player.y -= diagonalV;
        this.player.anims.play(NORTH_WEST, true);
        break;
      default:
        this.player.anims.stop();
        break;
    }
  }
}
