class DialogItem {
  constructor(character, text, next, options) {
    this.speaker = character
    this.text = text
    this.next = next
    this.participants = options.participants
    this.isSkippable = options.isSkippable != null ? options.isSkippable : true
    this.condition = options.condition

    this.isChoice = next != null && typeof next !== "string"
  }

  checkSelfCondition(player) {
    return this.checkConditionByOption(this, player)
  }

  checkCondition(story, selected, player) {
    const optionList = this.next.map(opt => story[opt])
    const option = optionList[selected]

    return this.checkConditionByOption(option, player)
  }

  checkConditionByOption(option, player) {
    if (option.condition != null && option.condition.check != null) {
      const { check } = option.condition
      const value = player[check.typeField][check.itemField][check.valueField]
      return value >= check.value
    } else {
      return true
    }
  }

  continue(story, selected, player) {
    if (this.next) {
      if (this.isChoice && selected != null) {
        if (this.checkCondition(story, selected, player)) {
          return story[story[this.next[selected]].next]
        } else {
          return null
        }
      } else if (this.isChoice) {
        return null
      } else {
        return story[this.next]
      }
    }
    return null
  }
}

export default DialogItem
