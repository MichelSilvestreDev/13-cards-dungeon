class PlayerManager {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards;
    this.life = 13;
  }

  createPlayer() {
    const player = document.createElement("div");
    player.setAttribute("id", "player");
    return player;
  }

  getHit(damage) {
    this.life -= damage;
  }

  move() {

  }
}

export default PlayerManager;
