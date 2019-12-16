/* eslint-disable no-template-curly-in-string */

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
    yen: 5000,
    diamond: 3,
  },
  transactions: {
    yen: [],
    diamond: []
  },
  inventory: {}
}

const characters = {
  player,
  emma: { name: 'Emma', color: '#ff3355', img: '/characters/female_01/FS1-default.png' },
  lucy: { name: 'Lucy', color: '#ab0fff', img: '/characters/female_02/school/Default.png' },
  barista: { name: 'Sarah', color: '#5433a0', img: '/characters/barista.png' },
}


const initialState = {
  error: null,
  currentDialog: null,
  characters,
  route: '/',
  prevRoute: '/'
}

export default initialState
