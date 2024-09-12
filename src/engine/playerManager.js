class PlayerManager {
  constructor(name, cardsManager, startPosition) {
    this.name = name;
    this.cardsManager = cardsManager;
    this.life = 13;
    this.position = startPosition;
  }

  createPlayer() {
    const player = document.createElement("div");
    player.setAttribute("id", "player");
    return player;
  }

  getHit(damage) {
    this.life -= damage;
  }

  canMoveTo(direction) {
    const verifyCardAndPosition = (cardInPosition, types) => {
      return (
        !!cardInPosition &&
        types.includes(
          this.cardsManager.getCardByPosition(this.position).type
        )
      );
    };

    if (["left", "right"].includes(direction)) {
      const cardInPosition =
        direction === "left"
          ? this.cardsManager.getCardByPosition(this.position - 1)
          : this.cardsManager.getCardByPosition(this.position + 1);

      return {
        canMove: verifyCardAndPosition(cardInPosition, ["ladder", "corridor", "start", "door", "key"]),
        cardId: cardInPosition?.id || "",
        newPosition:
          direction === "left" ? this.position - 1 : this.position + 1,
      };
    } else {
      const cardInPosition =
        direction === "up"
          ? this.cardsManager.getCardByPosition(this.position - 7)
          : this.cardsManager.getCardByPosition(this.position + 7);

      return {
        canMove: verifyCardAndPosition(cardInPosition, ["ladder"]),
        cardId: cardInPosition?.id || "",
        newPosition: direction === "up" ? this.position - 7 : this.position + 7,
      };
    }
  }

  move(direction) {
    const { canMove, cardId, newPosition } = this.canMoveTo(direction);
    if (canMove) {
      this.position = newPosition;
      const cardElem = document.querySelector(`#${cardId}`);
      document.querySelector("#player").remove();
      cardElem.appendChild(this.createPlayer());
    } else {
      console.log(cardId, newPosition);
    }
  }
}

export default PlayerManager;
