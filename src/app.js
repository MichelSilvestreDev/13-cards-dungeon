import Game from "./engine/gameManager.js";
import LadderCard from "./models/cards/ladder.js";
import Player from "./models/playerModel.js";
import Scene from "./models/scenes/sceneModel.js";

const App = () => {
  const gameScene = new Scene("gameScene");
  const ladderCard = new LadderCard("Ladder", "");
  const cards = [ladderCard, ladderCard, ladderCard];
  const player = new Player("Tadeu", 3, cards);
  const game = new Game(gameScene, player, cards, "");

  game.buildLevel();
};

App();
