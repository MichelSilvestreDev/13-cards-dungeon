import CardManager from "./cardManager";
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
    this.cardManager = new CardManager();
    this.ui = new UIManager(this.body, this.cards, this.countPlayerCards);
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
        const doorCard = this.cardManager.createCard("door", "", "door");
        cardSlot.appendChild(doorCard);
      }

      cardSlot.addEventListener("dragover", event => {
        event.preventDefault();
      });

      cardSlot.addEventListener("drop", event => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("cardId");
        const cardElement = document.getElementById(cardId);

        if (cardElement && !cardSlot.hasChildNodes()) {
          cardSlot.appendChild(cardElement);
        }
      });

      board.appendChild(cardSlot);
    }
  }
}

export default Game;
