import Character from './Character'

class Player extends Character {
  constructor(name, color) {
    super(name, null, color)

    this.stats = {}
    this.wallet = {}
    this.inventory = {}
  }
}

export default Player
