class LevelManager {
  constructor(cardSlots, currentLevel, levels) {
    this.cardSlots = cardSlots;
    this.currentLevel = currentLevel;
    this.lastLevel = 12;
    this.levelData = levels;
    this.transitionTime = 1500;
  }

  getLevel(levelIndex) {
    return this.levelData[levelIndex];
  }

  getLevels() {
    return this.levelData;
  }

  async levelTransition() {
    return new Promise((resolve) => {
      const transition = document.createElement("div");
      transition.classList.add("level-transition");
      transition.textContent = `Level ${this.currentLevel + 2}`;
      document.body.appendChild(transition);

      setTimeout(() => {
        transition.remove();
        resolve();
      }, this.transitionTime);
    });
  }

  async nextLevel() {
    await this.levelTransition();
    if (this.currentLevel < this.lastLevel) this.currentLevel += 1;
  }
}

export default LevelManager;
