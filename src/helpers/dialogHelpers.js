import story from '../data/story'

export function checkCondition(selected, player) {
  const optionList = this.next.map(opt => story[opt])
  const option = optionList[selected]

  return this.checkConditionByOption(option, player)
}

export function checkConditionByOption(option, player) {
  if (option.condition != null) {
    const { condition } = option
    const value = player[condition.typeField][condition.propField].value
    return value >= condition.value
  } else {
    return true
  }
}

function getVariable(state, selector) {
  const fields = selector.substring(1, selector.length-1).split('.')
  let variable = state[fields[0]]
  for (let i = 1; i < fields.length; i++) {
    variable = variable[fields[i]]
  }
  return variable
}

export function fillDialog(state, text) {
  let dialogText = text
  const field_regex = /%\w*(\.\w*)+%/gm

  const matches = text.match(field_regex)
  if (matches != null) {
    let parts = [ text ]
    matches.forEach(match => {
      let bits = parts
      parts = []
      bits.forEach(bit => {
        parts = parts.concat(bit.split(match))
      })
    })
    dialogText = parts[0]

    for (let i = 1; i < parts.length; i++) {
      dialogText += getVariable(state, matches[i-1]) + parts[i]
    }
  }
  return dialogText
}
