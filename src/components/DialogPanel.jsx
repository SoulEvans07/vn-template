import React, { Component } from 'react'
import './DialogPanel.scss'


class DialogPanel extends Component{
  constructor(props) {
    super(props)

    this.state = {
      dialog: props.story["01"]
    }

    this.continue = this.continue.bind(this)
    this.renderChoices = this.renderChoices.bind(this)
    this.renderOption = this.renderOption.bind(this)
  }

  continue(selected) {
    const { story, player } = this.props
    const current = this.state.dialog
    if(current.continue(story, selected, player))
      this.setState({ dialog: current.continue(story, selected, player) })
  }

  renderOption(option, index) {
    const { story, player } = this.props

    let text = option.text
    let isDisabled = false
    if (option.condition != null && option.condition.check != null) {
      const { check } = option.condition
      text = `[${player[check.typeField][check.itemField][check.displayNameField]} ${check.value}] ${text}`

      isDisabled = !option.checkSelfCondition(player)
    }
    return (
      <div className={"option" + (isDisabled ? " disabled" : "")} key={text + index}
        onClick={() => !isDisabled && this.continue(index)}>
        { text }
      </div>
    )
  }

  renderChoices(dialog) {
    const { story, player } = this.props
    const { next } = dialog
    const optionList = next.map(opt => story[opt])
    return (
      <div className="dialog-options">
        { optionList.map((option, index) => this.renderOption(option, index))}
      </div>
    )
  }

  render() {
    const { dialog } = this.state
    const url = "https://66.media.tumblr.com/bd91b2e7002002de51807c1edf4dc4aa/tumblr_o9tcb8UYXm1tykq7oo1_1280.jpg";
    const panelStyle = {
      backgroundImage: `url(${url})`,
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }

    return (
      <div className="dialog-panel" style={panelStyle}>
        <div className="characters">
          {!!dialog && !!dialog.participants &&
            dialog.participants.map((char, index) => {
              return (
                <div className="character-avatar" key={char.name}>
                  <img src={char.img} alt={char.name}/>
                </div>
              )
            })
          }
        </div>
        { dialog && dialog.isChoice && this.renderChoices(dialog) }
        <div className="dialog-textbox">
          <div className="dialog-header">
            {!!dialog &&
              <span style={{ color: dialog.speaker.color }}>
                { dialog.speaker.name }
              </span>
            }
          </div>
          <div className="dialog-text">
            {!!dialog &&
              <span style={{ color: dialog.speaker.color }}>
                { dialog.text }
              </span>
            }
          </div>
          <div className="dialog-controls">
            <span className="control-btn" onClick={() => this.continue()}>
              Next
              <i className="fas fa-chevron-right" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default DialogPanel
