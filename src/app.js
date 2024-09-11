import CardManager from "./engine/cardManager.js";
import Game from "./engine/gameManager.js";
import LevelManager from "./engine/levelManager.js";
import Player from "./models/playerModel.js";
import Scene from "./models/scenes/sceneModel.js";

const App = () => {
  const gameScene = new Scene("gameScene");
  const cards = [1, 2, 3, 4, 5];
  const player = new Player("Tadeu", cards);
  const levels = [
    { 0: "start", 4: "door" },
    { 7: "start", 13: "door" },
    { 0: "start", 12: "door" },
    { 0: "start", 17: "door" },
    { 0: "start" },
    { 7: "door" },
    { 7: "door" },
    { 7: "door" },
    { 7: "door" },
    { 7: "door" },
    { 7: "door" },
    { 7: "door" },
  ];
  const levelManager = new LevelManager(21, 0, levels);

  const game = new Game(gameScene, player, cards, levelManager);

  game.buildLevel();
  game.buildUI();
};

App();
