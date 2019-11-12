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
    yen: { symbol: '¥', value: 5000 },
    diamond: { symbol: '💎', value: 1 }
  },
  inventory: {}
}

const characters = {
  player,
  emma: { name: 'Emma', color: '#ff3355', img: '/female_01/FS1-default.png' },
  lucy: { name: 'Lucy', color: '#ab0fff', img: '/female_02/school/Default.png' }
}

const locations = {
  school: {
    name: 'School',
    background: '/bg/school-bg.png'
  }
}


const initialState = {
  error: null,
  characters,
  locations,
  currentDialog: null
}

export default initialState
