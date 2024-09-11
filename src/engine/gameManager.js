import CardManager from "./cardManager";
import UIManager from "./uiManager";

class Game {
  constructor(scenes, player, cards, levelManager) {
    this.scenes = scenes;
    this.player = player;
    this.cards = cards;
    this.levelManager = levelManager;
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
    this.body.innerHTML = "";
    const board = document.createElement("div");
    board.classList.add("board");
    this.body.appendChild(board);

    for (let i = 0; i < this.levelManager.cardSlots; i++) {
      const cardSlot = document.createElement("div");
      cardSlot.classList.add("card-slot");

      if (this.levelManager.levelData[this.levelManager.currentLevel][i] === "start") {
        const startCard = this.cardManager.createCard("start", "", "start", false);
        cardSlot.appendChild(startCard);
      }

      if (this.levelManager.levelData[this.levelManager.currentLevel][i] === "door") {
        const doorCard = this.cardManager.createCard("door", "", "door", false);
        cardSlot.appendChild(doorCard);
        doorCard.addEventListener("click", () => this.finishLevel());
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

  finishLevel() {
    window.alert("Level complete!");
    this.levelManager.nextLevel();
    this.buildLevel();
    this.buildUI();
  }
}

export default Game;
