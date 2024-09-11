import CardManager from "./cardManager";

class UIManager {
  constructor(body, cards, countCards) {
    this.body = body;
    this.cards = cards;
    this.limitCardsInHand = 5;
    this.countCards = countCards;
    this.cardManager = new CardManager();
  }

  buildDPad() {
    const dpad = document.createElement("div");
    dpad.classList.add("d-pad");
    return dpad;
  }

  buildContainer() {
    const container = document.createElement("div");
    const cardsContainer = document.createElement("div");
    container.classList.add("container");
    cardsContainer.classList.add("container-cards");

    for (let i = 0; i < this.cards.length; i++) {
      if (i < this.limitCardsInHand) {
        const card = this.cardManager.createCard("door", "", "door", true);
        cardsContainer.appendChild(card);
      }
    }

    container.appendChild(cardsContainer);

    return container;
  }

  buildUI() {
    const container = this.buildContainer();
    this.body.appendChild(container);
  }
}

export default UIManager;
