import { v4 as uuidv4 } from "uuid";
import doorSvg from "../../assets/door.svg";
import ladderSvg from "../../assets/ladder.svg";
import keySvg from "../../assets/key.svg";

class Card {
  constructor(type, isDraggable = true) {
    this.id = uuidv4();
    this.type = type;
    this.isDraggable = isDraggable;
  }

  createCardByType(type) {
    switch (type) {
      case "start":
        return { name: "start", figure: "" };
        break;
      case "door":
        return { name: "door", figure: doorSvg };
        break;
      case "corridor":
        return { name: "corridor", figure: "" };
        break;
      case "ladder":
        return { name: "ladder", figure: ladderSvg };
        break;
      case "key":
        return { name: "key", figure: keySvg };
        break;
      case "heart":
        return { name: "heart", figure: "" };
        break;
      case "bomb":
        return { name: "bomb", figure: "" };
        break;
      default:
        return {};
        break;
    }
  }

  getCard() {
    let card = this.createCardByType(this.type);

    card = {
      ...card,
      id: this.id,
      type: this.type,
      isDraggable: this.isDraggable,
    };

    return card;
  }
}

export default Card;
