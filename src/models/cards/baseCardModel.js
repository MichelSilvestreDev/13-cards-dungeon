class BaseCard {
  constructor(name, figrue) {
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
