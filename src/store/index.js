import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import _ from 'lodash'

import initialState from './initialState'
import story from './story'
import { dialogActionTypes } from '../actions/dialogActions'
import * as dialogHelpers from '../helpers/dialogHelpers'

function setDialog(state, payload) {
  if (payload.dialogIds == null || payload.dialogIds.length === 0) return state

  const { characters, locations } = state
  const { dialogIds, selected } = payload
  const index = selected != null ? selected : 0
  const dialog = story[dialogIds[index]]

  dialog.speaker = characters[dialog.speaker]
  dialog.scene.characters = dialog.scene.characters.map(char => characters[char])
  dialog.scene.location = locations[dialog.scene.location]
  dialog.text = dialogHelpers.fillDialog(state, dialog.text)

  if (dialog.actions) {
    console.log("take actions")
    dialog.actions.forEach(action => takeAction(state, { action }))
    console.log(state)
  }

  return { ...state, currentDialog: dialog }
}

function takeAction(state, payload) {
  const { characters } = state
  const { action } = payload

  switch (action.type) {
    case "DECREASE":
      // const value = characters[action.target][action.typeField][action.itemField].value
      const target = _.clone(characters[action.target], true)
      target[action.typeField][action.itemField].value -= action.amount
      const newCharacters = { ...characters, [action.target]: target }
      return { ...state, characters: newCharacters }
    default:

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
