/* eslint-disable no-template-curly-in-string */

const currencies = {
  yen: { symbol: '¥' },
  diamond: { symbol: '💎' },
}

const player = {
  name: 'Soul',
  color: '#2c3e50',
  img: null,
  stats: {
    cha: { name: 'Charisma', value: 10 },
    int: { name: 'Intelligence', value: 10 },
    str: { name: 'Strength', value: 10 },
    lck: { name: 'Luck', value: 10 },
  },
  wallet: {
    yen: 500,
    diamond: 1,
  },
  inventory: {}
}

const characters = {
  player,
  emma: { name: 'Emma', color: '#ff3355', img: '/characters/female_01/FS1-default.png' },
  lucy: { name: 'Lucy', color: '#ab0fff', img: '/characters/female_02/school/Default.png' },
  barista: { name: 'Sarah', color: '#5433a0', img: '/characters/barista.png' },
}

const locations = {
  'school': { name: 'School', background: '/bg/school-bg.png' },
  'street-day': { name: 'Street', background: '/bg/street-day.jpg' },
  'street-night': { name: 'Street', background: '/bg/street-night.jpg' },
  'store': { name: 'Convenience store', background: '/bg/store.jpg' },
  'coffe-shop': { name: 'Coffee shop', background: '/bg/coffee-shop.jpeg' },
}

const stores = {
  'coffee-shop' : {
    items: [
      {
        name: 'Expresso',
        price: { currency: 'yen', amount: '80' },
        response: {
          speaker: 'barista', text: "You like it dark, right?"
        }
      },
      {
        name: 'Cappuccino',
        price: { currency: 'yen', amount: '100' },
        response: {
          speaker: 'barista', text: "How convenient."
        }
      },
      {
        name: 'Latte',
        price: { currency: 'yen', amount: '120' },
        response: {
          speaker: 'barista', text: "I guess you are too young to appreciate the bitter sweetnes of coffee."
        }
      }
    ]
  }
}


const initialState = {
  error: null,
  currencies,
  characters,
  locations,
  stores,
  currentDialog: null
}

export default initialState
