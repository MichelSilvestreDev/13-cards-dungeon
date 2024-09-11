import Card from "../models/cards/Card";

class CardManager {
  constructor() {
    this.cardsList = [];
  }

  insertCard(card) {
    this.cardsList.push(card);
  }

  removeCard(id) {
    return this.cardsList.filter((e) => e.id !== id);
  }

  createCard(type, isDraggable) {
    const card = new Card(type, isDraggable);
    this.insertCard(card.getCard());

    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", `card ${type}`);
    cardElement.setAttribute("id", card.id);

    if (isDraggable) {
      cardElement.setAttribute("draggable", "true");
      cardElement.classList.add("draggable");
      cardElement.addEventListener("dragstart", event => {
        event.dataTransfer.setData("cardId", card.id);
      });
    }
    return cardElement;
  }

  getCardList() {
    return this.cardsList;
  }

  getCard(id) {
    return this.cardsList.find((e) => e.id === id);
  }
}

export default CardManager;
