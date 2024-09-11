import Card from "../models/cards/Card";
import blockSvg from "../assets/block.svg";

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
    const cardImg = document.createElement("img");
    cardElement.setAttribute("class", `card ${type}`);
    cardElement.setAttribute("id", card.id);
    cardImg.setAttribute("src", card.getCard().figure);

    cardElement.appendChild(cardImg);

    for (let i = 0; i < 3; i++) {
      const cardBg = document.createElement("img");
      cardBg.setAttribute("src", blockSvg);
      cardBg.classList.add("card-bg");
      cardElement.appendChild(cardBg);
    }

    if (isDraggable) {
      cardElement.setAttribute("draggable", "true");
      cardElement.classList.add("draggable");
      cardElement.addEventListener("dragstart", (event) => {
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
