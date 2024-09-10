import UIManager from "./uiManager";

class Game {
  constructor(scenes, player, cards, levels) {
    this.scenes = scenes;
    this.player = player;
    this.cards = cards;
    this.levels = levels;
    this.body = window.document.querySelector("body");
    this.countPlayerCards = 0;
    this.limitCards = 13;
    this.ui = new UIManager(this.body, this.cards, this.countPlayerCards);
  }

  createCard(type) {
    const card = document.createElement("div");
    card.setAttribute("class", `card draggable ${type}`);
    return card;
  }

  buildUI() {
    this.ui.buildUI();
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
        doorCard.setAttribute("dragable", "true");
        cardSlot.appendChild(doorCard);
      } else {
        cardSlot.classList.add("card-slot--empty");
      }

      board.appendChild(cardSlot);
    }
  }
}

export default Game;
