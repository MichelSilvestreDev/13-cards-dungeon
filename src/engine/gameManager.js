class Game {
  constructor(scenes, player, cards, levels) {
    this.scenes = scenes;
    this.player = player;
    this.cards = cards;
    this.levels = levels;
    this.currentLevel = 0;
    this.lastLevel = 12;
  }

  buildLevel() {
    console.log(`Level ${this.currentLevel} start!`);
  }
}

export default Game;
