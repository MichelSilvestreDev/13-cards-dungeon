import Card from "../models/cards/Card";

class CardManager {
  constructor() {
    this.cardsList = [];
  }

  insertCard(card) {
    this.cardsList.push(card);
  }

  removeCard(id) {
    return this.cardsList.filter(e => e.id !== id);
  }

  createCard(name, figure, type, isDraggable = true) {
    const card = new Card(name, figure, type, isDraggable);
    this.insertCard(card);

    const cardElment = document.createElement("div");
    card.setAttribute("class", `card dragable ${type}`);
    card.setAttribute("dragable", "true");
    return cardElment;
  }

  getCardList() {
    return this.cardsList;
  }

  getCard(id) {
    return this.cardsList.find(e => e.id === id);
  }
}

export default CardManager;
