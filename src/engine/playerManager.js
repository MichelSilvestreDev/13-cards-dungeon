class PlayerManager {
  constructor(cardsManager, levelManager) {
    this.cardsManager = cardsManager;
    this.life = 13;
    this.position = 0;
    this.levelManager = levelManager;
  }

  createPlayer(position) {
    const player = document.createElement("div");
    player.setAttribute("id", "player");
    this.position = position;
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
        cardType: cardInPosition.type,
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
        cardType: cardInPosition.type,
        newPosition: direction === "up" ? this.position - 7 : this.position + 7,
      };
    }
  }

  move(direction) {
    const { canMove, cardId, cardType, newPosition } = this.canMoveTo(direction);
    if (canMove) {
      const cardElem = document.querySelector(`#${cardId}`);
      document.querySelector("#player").remove();
      cardElem.appendChild(this.createPlayer());
      this.position = newPosition;
      if(cardType === "door") {
        this.levelManager.finishLevel();
      }
    } else {
      console.log(cardId, newPosition);
    }
  }

  resetPlayer() {
    this.life = 13;
  }
}

export default PlayerManager;
