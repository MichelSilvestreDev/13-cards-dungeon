class Player {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards;
    this.life = 13;
  }

  getHit(damage) {
    this.life -= damage;
  }

  move() {

  }
}

export default Player;
