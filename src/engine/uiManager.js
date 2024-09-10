class UIManager {
  constructor(body, cards, countCards) {
    this.body = body;
    this.cards = cards;
    this.limitCardsInHand = 5;
    this.countCards = countCards;
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
        const card = document.createElement("div");
        card.setAttribute("class", "card draggable");
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
