class Game {
  constructor(scenes, player, cards, levels) {
    this.scenes = scenes;
    this.player = player;
    this.cards = cards;
    this.levels = levels;
    this.body = window.document.querySelector("body");
  }

  createCard(type) {
    const card = document.createElement("div");
    card.setAttribute("class", `card dragable ${type}`);
    return card;
  }

  buildLevel() {
    const board = document.createElement("div");
    board.classList.add("board");
    this.body.appendChild(board);

    for (let i = 0; i < this.levels.cardSlots; i++) {
      const cardSlot = document.createElement("div");
      cardSlot.classList.add("card-slot");

      if (this.levels.levelData[this.levels.currentLevel][i] === "door") {
        const doorCard = this.createCard("door");
        cardSlot.appendChild(doorCard);
        // cardSlot.classList.add("card-slot");
      } else {
        cardSlot.classList.add("card-slot--empty");
      }

      board.appendChild(cardSlot);
    }
  }
}

export default Game;
