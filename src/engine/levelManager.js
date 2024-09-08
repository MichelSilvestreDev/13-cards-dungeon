class LevelManager {
  constructor(cardSlots, currentLevel) {
    this.cardSlots = cardSlots;
    this.currentLevel = currentLevel;
    this.lastLevel = 12;
    this.levelData = [];
  }

  addLevel(level) {
    this.levelData.push(level);
  }

  getLevel(levelIndex) {
    return this.levelData[levelIndex];
  }

  getLevels() {
    return this.levelData;
  }
}

export default LevelManager;
