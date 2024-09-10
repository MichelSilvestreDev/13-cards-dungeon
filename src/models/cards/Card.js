import { v4 as uuidv4 } from 'uuid';

class Card {
  constructor(name, figure, type, isDraggable = true) {
    this.id = uuidv4();
    this.name = name;
    this.figure = figure;
    this.type = type;
    this.isDraggable = isDraggable;
  }

  getCard() {
    return {
      id: this.id,
      name: this.name,
      figure: this.figure,
      type: this.type,
      isDraggable: this.isDraggable,
    }
  }
}

export default Card;