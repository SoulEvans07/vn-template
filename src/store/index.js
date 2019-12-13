import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import _ from 'lodash'

import initialState from './initialState'
import story from '../data/story'
import stores from '../data/stores'
import locations from '../data/locations'
import { dialogActionTypes } from '../actions/dialogActions'
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
      newState = takeAction(state, { action: dialog.actions[i] })
    }
  }

  return { ...newState, currentDialog: dialog }
}

function takeAction(state, payload) {
  const { characters } = state
  const { type, target, typeField, itemField, amount } = payload.action

  const newCharacters = _.cloneDeep(characters)
  switch (type) {
    case "DECREASE":
      newCharacters[target][typeField][itemField].value -= amount
      return { ...state, characters: newCharacters }
    case "INCREASE":
      newCharacters[target][typeField][itemField].value += amount
      return { ...state, characters: newCharacters }
    default:
      return state
  }
}


function rootReducer(state, action) {
  switch (action.type) {
    case dialogActionTypes.SET_DIALOG:
      return setDialog(state, action.payload)
    case dialogActionTypes.TAKE_ACTION:
      return takeAction(state, action.payload)
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
