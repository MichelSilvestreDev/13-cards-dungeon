class PlayerManager {
  constructor(name, cardsManager) {
    this.name = name;
    this.cardsManager = cardsManager;
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

  move() {}
}

export default PlayerManager;
