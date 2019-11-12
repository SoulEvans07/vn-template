import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import initialState from './initialState'
import story from './story'
import { dialogActionTypes } from '../actions/dialogActions'
import * as dialogHelpers from '../helpers/dialogHelpers'

function setDialog(state, payload) {
  if (payload.dialogIds == null) return state
  const { characters, locations } = state
  const { dialogIds, selected } = payload
  const index = selected != null ? selected : 0

  const dialog = story[dialogIds[index]]

  dialog.speaker = characters[dialog.speaker]
  dialog.scene.characters = dialog.scene.characters.map(char => characters[char])
  dialog.scene.location = locations[dialog.scene.location]
  dialog.text = dialogHelpers.fillDialog(state, dialog.text)

  return { ...state, currentDialog: dialog }
}


function rootReducer(state, action) {
  switch (action.type) {
    case dialogActionTypes.SET_DIALOG:
      return setDialog(state, action.payload)

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
