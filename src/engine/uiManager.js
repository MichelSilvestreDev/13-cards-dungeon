class UIManager {
  constructor(body, cardsManager, countCards) {
    this.body = body;
    this.countCards = countCards;
    this.cardManager = cardsManager;
    this.limitCardsInHand = 5;
    this.limitPlayerCards = 13;
  }

  getRandomCardType() {
    const randomIndex = Math.floor(
      Math.random() * this.cardManager.playerCardTypes.length
    );
    return this.cardManager.playerCardTypes[randomIndex];
  }

  buildDPad() {
    const dpad = document.createElement("div");
    dpad.classList.add("d-pad");
    return dpad;
  }

  buildPlayerUI(playerLife) {
    const playerUI = document.createElement("div");
    playerUI.setAttribute("id", "player-ui");
    playerUI.textContent = `Player life is ${playerLife}`;
    return playerUI;
  }

  updatePlayerUI(playerLife) {
    const playerUI = document.querySelector("#player-ui");
    playerUI.textContent = `Player life is ${playerLife}`;
  }

  buildContainer() {
    const container = document.createElement("div");
    const cardsContainer = document.createElement("div");
    container.classList.add("container");
    cardsContainer.classList.add("container-cards");

    for (let i = 0; i < this.limitPlayerCards; i++) {
      if (i < this.limitCardsInHand) {
        const randomType = this.getRandomCardType();
        const card = this.cardManager.createCard(randomType, true);
        cardsContainer.appendChild(card);
      }
    }

    container.appendChild(cardsContainer);

    return container;
  }

  buildUI(playerLife) {
    const container = this.buildContainer();
    const playerUI = this.buildPlayerUI(playerLife);
    container.appendChild(playerUI);
    this.body.appendChild(container);
  }
}

export default UIManager;
