class Character {
  constructor(name, img, color) {
    this.name = name
    this.img = img !== null ? process.env.PUBLIC_URL + img : null
    this.color = color
  }
}

export default Character
