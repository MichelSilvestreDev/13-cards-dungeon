import Game from "./engine/gameManager.js";
import LevelManager from "./engine/levelManager.js";
import Player from "./models/playerModel.js";
import Scene from "./models/scenes/sceneModel.js";

const App = () => {
  const gameScene = new Scene("gameScene");
  const cards = [];
  const player = new Player("Tadeu", 3, cards);
  const levels = new LevelManager(21, 0);

  levels.addLevel({ 12: "door" });

  const game = new Game(gameScene, player, cards, levels);

  game.buildUI();

  game.buildLevel();
};

App();
