class Game {
  constructor(scenes, player, cards, levels) {
    this.scenes = scenes;
    this.player = player;
    this.cards = cards;
    this.levels = levels;
    this.body = window.document.querySelector("body");
  }

  buildLevel() {
    const board = document.createElement("div");
    board.classList.add("board");
    this.body.appendChild(board);

    // Configura o número de slots (posições) para o nível atual
    for (let i = 0; i < this.levels.cardSlots; i++) {
      console.log("aqui", this.levels.cardSlots);
      const cardSlot = document.createElement("div");
      cardSlot.classList.add("card-slot");

      // Verifica se o slot é a saída (porta) para o nível atual
      if (this.levels.levelData[this.levels.currentLevel][i] === "door") {
        cardSlot.classList.add("door-slot");
        cardSlot.textContent = "Saída";
      } else {
        cardSlot.textContent = "Drop the card here";
      }

      board.appendChild(cardSlot);
    }
  }
}

export default Game;
