class Stat {
  constructor(name, short, value) {
    this.name = name
    this.short = short
    this._value = value
  }

  getValue() {
    return this._value
  }

  increase() {
    this._value++
  }

  decrease() {
    this._value--
    if (this._value < 0) {
      this._value = 0
    }
  }
}

Stat.prototype.toString = function() {
  return this.short + ' ' + this._value
}

export default Stat
