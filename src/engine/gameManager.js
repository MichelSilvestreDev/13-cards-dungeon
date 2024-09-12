import CardManager from "./cardManager";
import UIManager from "./uiManager";

class Game {
  constructor(scenes, playerManager, cardsManager, levelManager) {
    this.scenes = scenes;
    this.playerManager = playerManager;
    this.levelManager = levelManager;
    this.body = window.document.querySelector("body");
    this.countPlayerCards = 0;
    this.cardsManager = cardsManager;
    this.ui = new UIManager(
      this.body,
      this.cardsManager,
      this.countPlayerCards
    );
  }

  buildUI() {
    this.ui.buildUI(this.playerManager.life);
  }

  buildLevel() {
    this.body.innerHTML = "";
    const board = document.createElement("div");
    board.classList.add("board");
    this.body.appendChild(board);

    const player = this.playerManager.createPlayer();

    for (let i = 0; i < this.levelManager.cardSlots; i++) {
      const cardSlot = document.createElement("div");
      cardSlot.classList.add("card-slot");

      if (
        this.levelManager.levelData[this.levelManager.currentLevel][i] ===
        "start"
      ) {
        const startCard = this.cardsManager.createCard("start", false, i);
        this.levelManager.insertCardsInBoard(startCard);
        startCard.appendChild(player);
        cardSlot.appendChild(startCard);
      }

      if (
        this.levelManager.levelData[this.levelManager.currentLevel][i] ===
        "door"
      ) {
        const doorCard = this.cardsManager.createCard("door", false, i);
        cardSlot.appendChild(doorCard);
        doorCard.addEventListener("click", () => this.finishLevel());
      }

      cardSlot.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      cardSlot.addEventListener("drop", (event) => {
        event.preventDefault();
        this.playerManager.getHit(1);
        this.ui.updatePlayerUI(this.playerManager.life);
        const cardId = event.dataTransfer.getData("cardId");
        const cardElement = document.getElementById(cardId);

        if (cardElement && !cardSlot.hasChildNodes()) {
          // Atualizar a position da carta dropada
          this.cardsManager.setCardPosition(cardId, i);
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
