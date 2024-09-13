import PlayerManager from "./playerManager";
import UIManager from "./uiManager";
import bgAudio from "../assets/audio/sound.mp3";
class Game {
  constructor(scenes, cardsManager, levelManager) {
    this.scenes = scenes;
    this.levelManager = levelManager;
    this.body = window.document.querySelector("body");
    this.countPlayerCards = 0;
    this.cardsManager = cardsManager;
    this.ui = new UIManager(
      this.body,
      this.cardsManager,
      this.countPlayerCards
    );
    this.playerManager = new PlayerManager(cardsManager, levelManager, this.ui);
    this.soundTrack = new Audio(bgAudio);
  }

  playAudio() {
    this.soundTrack.loop = true;
    this.soundTrack.play();
  }

  pauseAudio() {
    this.soundTrack.pause();
  }

  buildStart() {
    const startContainer = this.ui.createStartUI();
    const startButton = document.createElement("button");
    startButton.addEventListener("click", () => {
      this.body.innerHTML = "";
      this.playAudio();
      this.buildLevel();
      this.buildUI();
      this.inputListen();
    });
    startButton.textContent = "START";
    startContainer.appendChild(startButton);
    this.body.appendChild(startContainer);
  }

  buildUI() {
    this.ui.buildUI(this.playerManager.life);
  }

  buildLevel() {
    this.body.innerHTML = "";
    const board = document.createElement("div");
    board.classList.add("board");
    this.body.appendChild(board);

    this.levelManager.startLevel();
    this.playerManager.removeKey();

    const levelKeys = Object.keys(
      this.levelManager.levelData[this.levelManager.currentLevel]
    );

    let startPosition;

    for (let key of levelKeys) {
      if (
        this.levelManager.levelData[this.levelManager.currentLevel][key] ===
        "start"
      ) {
        startPosition = key;
      }
    }

    const player = this.playerManager.createPlayer(parseInt(startPosition));

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
        doorCard.addEventListener("click", () => this.finishLevel()); // Remove me
      }

      if (
        this.levelManager.levelData[this.levelManager.currentLevel][i] === "key"
      ) {
        const keyCard = this.cardsManager.createCard("key", false, i);
        cardSlot.appendChild(keyCard);
      }

      if (
        this.levelManager.levelData[this.levelManager.currentLevel][i] ===
        "enemy"
      ) {
        const enemyCard = this.cardsManager.createCard("enemy", false, i);
        enemyCard.querySelector("img").classList.add("zombie");
        cardSlot.appendChild(enemyCard);
      }

      cardSlot.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      cardSlot.addEventListener("drop", (event) => {
        event.preventDefault();

        const cardId = event.dataTransfer.getData("cardId");
        const cardElement = document.getElementById(cardId);

        if (cardElement && !cardSlot.hasChildNodes()) {
          const playerOnCard = cardElement.querySelector("#player");

          if (!playerOnCard) {
            this.playerManager.getHit(1);
            this.ui.updatePlayerUI(this.playerManager.life);
            this.cardsManager.setCardPosition(cardId, i);
            cardSlot.appendChild(cardElement);
          }
        }
      });

      board.appendChild(cardSlot);
    }
  }

  inputListen() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.playerManager.move("left");
          break;
        case "ArrowRight":
          this.playerManager.move("right");
          break;
        case "ArrowUp":
          this.playerManager.move("up");
          break;
        case "ArrowDown":
          this.playerManager.move("down");
          break;
      }

      if (this.levelManager.currentLevelIsFinished) {
        this.finishLevel();
      }
    });
  }

  async finishLevel() {
    await this.levelManager.nextLevel();
    this.playerManager.resetPlayer();
    this.cardsManager.clearCardsList();
    this.buildLevel();
    this.buildUI();
  }
}

export default Game;
