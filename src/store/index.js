import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import _ from 'lodash'

import { UUID4 } from '../helpers/UUID'
import initialState from './initialState'
import story from '../data/story'
import stores from '../data/stores'
import locations from '../data/locations'
import { dialogActionTypes } from '../actions/dialogActions'
import valueReducer from './valueReducer'
import * as dialogHelpers from '../helpers/dialogHelpers'

function setDialog(state, payload) {
  if (payload.dialogIds == null || payload.dialogIds.length === 0) return state

  const { characters } = state
  const { dialogIds, selected } = payload
  const index = selected != null ? selected : 0
  const dialog = _.cloneDeep(story[dialogIds[index]])

  dialog.speaker = characters[dialog.speaker]
  dialog.scene.characters = dialog.scene.characters.map(char => {
    const character = characters[char.name]
    character.position = char.position
    return character
  })
  dialog.scene.location = locations[dialog.scene.location]
  dialog.scene.store = stores[dialog.scene.store]
  dialog.text = dialogHelpers.fillDialog(state, dialog.text)

  let newState = state
  if (dialog.actions) {
    for (let i = 0; i < dialog.actions.length; i++) {
      newState = valueReducer(state, { action: dialog.actions[i] })
    }
  }

  return { ...newState, currentDialog: dialog }
}

function buyItem(state, payload) {
  const { target, item } = payload
  const newCharacters = _.cloneDeep(state.characters)

  if (newCharacters[target].inventory) {
    newCharacters[target].inventory.push(item)
  }

  if (newCharacters[target].wallet) {
    if (newCharacters[target].wallet[item.price.currency] - item.price.amount >= 0) {
      newCharacters[target].wallet[item.price.currency] -= item.price.amount
      newCharacters[target].transactions[item.price.currency].push({
        _id: UUID4(),
        value: -item.price.amount,
        currency: item.price.currency
      })
    } else {
      // failed payment
    }
  }

  return { ...state, characters: newCharacters }
}

function removeTransaction(state, payload) {
  const { target, transaction } = payload
  const { currency } = transaction
  const newCharacters = _.cloneDeep(state.characters)
  newCharacters[target].transactions[currency] = newCharacters[target].transactions[currency].filter(trans => {
    return trans._id !== transaction._id
  })
  return { ...state, characters: newCharacters }
}

function rootReducer(state, action) {
  switch (action.type) {
    case dialogActionTypes.SET_DIALOG:
      return setDialog(state, action.payload)
    case dialogActionTypes.TAKE_ACTION:
      return valueReducer(state, action.payload)
    case dialogActionTypes.BUY_ITEM:
      return buyItem(state, action.payload)
    case "REMOVE_TRANSACTION":
      return removeTransaction(state, action.payload)
    default:
      return state
  }
}


const localstorage_object = 'visual_novel_template'
// const loadState = function() {
//   try {
//     const serializedState = localStorage.getItem(localstorage_object);
//     if (serializedState === null) {
//       return initialState
//     }
//     return { ...initialState, ...JSON.parse(serializedState) }
//   } catch (err) {
//     return initialState
//   }
// }

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

store.subscribe(() => {
  const currentState = store.getState()
  const serializedState = JSON.stringify(currentState)
  localStorage.setItem(localstorage_object, serializedState)
})

export default store
