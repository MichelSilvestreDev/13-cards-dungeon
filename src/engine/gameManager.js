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
    this.cardManager = new CardManager();
    this.ui = new UIManager(this.body, this.cards, this.countPlayerCards);
  }

  buildUI() {
    this.ui.buildUI(this.player.life);
  }

  buildLevel() {
    this.body.innerHTML = "";
    const board = document.createElement("div");
    board.classList.add("board");
    this.body.appendChild(board);

    for (let i = 0; i < this.levelManager.cardSlots; i++) {
      const cardSlot = document.createElement("div");
      cardSlot.classList.add("card-slot");

      if (
        this.levelManager.levelData[this.levelManager.currentLevel][i] ===
        "start"
      ) {
        const startCard = this.cardManager.createCard("start", false);
        cardSlot.appendChild(startCard);
      }

      if (
        this.levelManager.levelData[this.levelManager.currentLevel][i] ===
        "door"
      ) {
        const doorCard = this.cardManager.createCard("door", false);
        cardSlot.appendChild(doorCard);
        doorCard.addEventListener("click", () => this.finishLevel());
      }

      cardSlot.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      
      cardSlot.addEventListener("drop", (event) => {
        event.preventDefault();
        this.player.getHit(1);
        this.ui.updatePlayerUI(this.player.life);
        const cardId = event.dataTransfer.getData("cardId");
        const cardElement = document.getElementById(cardId);

        if (cardElement && !cardSlot.hasChildNodes()) {
          cardSlot.appendChild(cardElement);
        }
      });

      board.appendChild(cardSlot);
    }
  }

  async finishLevel() {
    await this.levelManager.nextLevel();
    this.buildLevel();
    this.buildUI();
  }
}

export default Game;
