class Currency {
  constructor(name, symbol, amount = 0) {
    this.name = name
    this.symbol = symbol
    this._amount = amount
  }

  getValue() {
    return this._amount
  }

  spend(amount) {
    if (this._amount - amount < 0) {
      return false
    } else {
      this._amount -= amount
    }
  }

  earn(amount) {
    this._amount += amount
  }
}

Currency.prototype.toString = function() {
  return this.symbol + ' ' + this._amount
}

export default Currency
