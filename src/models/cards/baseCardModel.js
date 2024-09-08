class BaseCard {
  constructor(id, name, figrue) {
    this.id = id;
    this.name = name;
    this.figrue = figrue;
  }

  name() {
    return this.name;
  }

  figrue() {
    return this.figrue;
  }
}

export default BaseCard;
