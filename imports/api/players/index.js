import { Mongo } from "meteor/mongo";
import { Class } from "meteor/jagi:astronomy";

export const Players = new Mongo.Collection("players");

export const Player = Class.create({
  name: "Player",
  collection: Players
});
