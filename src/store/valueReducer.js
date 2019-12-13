import _ from 'lodash'


function decreaseValue(state, payload) {
  const { target, typeField, propField, amount } = payload
  const newCharacters = _.cloneDeep(state.characters)

  newCharacters[target][typeField][propField].value -= amount
  return { ...state, characters: newCharacters }
}

function increaseValue(state, payload) {
  const { target, typeField, propField, amount } = payload
  const newCharacters = _.cloneDeep(state.characters)

  newCharacters[target][typeField][propField].value += amount
  return { ...state, characters: newCharacters }
}

function valueReducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case "DECREASE":
      return decreaseValue(payload)
    case "INCREASE":
      return increaseValue(payload)
    default:
      return state
  }
}

export default valueReducer
