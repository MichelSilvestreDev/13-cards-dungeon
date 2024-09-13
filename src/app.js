import CardManager from "./engine/cardManager.js";
import Game from "./engine/gameManager.js";
import LevelManager from "./engine/levelManager.js";
import Scene from "./models/scenes/sceneModel.js";

const App = () => {
  const gameScene = new Scene("gameScene");
  const cardsManager = new CardManager();
  const levels = [
    { 0: "start", 3: "key", 4: "door", 2: "enemy" },
    { 7: "start", 9: "key", 10: "door", 3: "enemy" },
    { 0: "start", 4: "key", 11: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
    { 0: "start", 17: "door" },
  ];
  const levelManager = new LevelManager(21, 0, levels);

  const game = new Game(gameScene, cardsManager, levelManager);

  game.buildLevel();
  game.buildUI();
  game.inputListen();
};

App();
