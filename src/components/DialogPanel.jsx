import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './DialogPanel.scss'
import * as dialogActions from '../actions/dialogActions'
import * as dialogHelpers from '../helpers/dialogHelpers'
import story from '../store/story'
import { storyStart } from '../store/story'

class DialogPanel extends Component{
  constructor(props) {
    super(props)

    if (props.currentDialog === null) {
      props.actions.setDialog([storyStart])
    }

    this.continue = this.continue.bind(this)
    this.buy = this.buy.bind(this)
    this.renderChoices = this.renderChoices.bind(this)
    this.renderOption = this.renderOption.bind(this)
  }

  continue(selected) {
    const { currentDialog, player, actions } = this.props

    if (currentDialog.next) {
      if (currentDialog.next.length === 1) {
        actions.setDialog(currentDialog.next)
      } else if (currentDialog.next.length > 1 && selected != null) {
        const next = currentDialog.next.map(opt => story[opt])[selected]

        if (next.condition != null) {
          if (dialogHelpers.checkConditionByOption(next, player)) {
            actions.setDialog(next.next)
          }
        } else {
          actions.setDialog(next.next)
        }
      }
    }
  }

  buy(selected) {
    console.log(selected)

    // actions.buy
    // this.continue()
  }

  renderOption(option, index) {
    const { player } = this.props

    let text = option.text
    let isDisabled = false
    if (option.condition != null) {
      const { condition } = option
      text = `[${player[condition.typeField][condition.itemField][condition.displayNameField]}` +
        `  ${player[condition.typeField][condition.itemField].value}/${condition.value}] ${text}`

      isDisabled = !dialogHelpers.checkConditionByOption(option, player)
    }
    return (
      <div className={"option" + (isDisabled ? " disabled" : "")} key={text + index}
        onClick={() => !isDisabled && this.continue(index)}>
        { text }
      </div>
    )
  }

  renderChoices(dialog) {
    const { next } = dialog
    const optionList = next.map(opt => story[opt])
    return (
      <div className="dialog-options">
        { optionList.map((option, index) => this.renderOption(option, index))}
      </div>
    )
  }

  renderStore(dialog) {
    const { next } = dialog
    const { currencies, actions } = this.props
    const { items } = dialog.scene.store

    const exitStoreOption = story[next[0]]

    return (
      <div className="store dialog-options">
        { items.map((item, index) => (
          <div className="option" key={item.name + index} onClick={() => this.buy(item)}>
            { `${item.name}: ${currencies[item.price.currency].symbol}${item.price.amount}` }
          </div>
        ))}
        <div className="option" onClick={() => actions.setDialog(exitStoreOption.next)}>
          { exitStoreOption.text }
        </div>
      </div>
    )
  }

  render() {
    const { currentDialog } = this.props
    const url = currentDialog ? process.env.PUBLIC_URL + currentDialog.scene.location.background : null
    const panelStyle = {
      backgroundImage: `url(${url})`,
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }

    const isNextDisabled = currentDialog && currentDialog.scene.store;

    return (
      <div className="dialog-panel" style={panelStyle}>
        <div className="characters">
          {!!currentDialog && !!currentDialog.scene.characters &&
            currentDialog.scene.characters.map((char, index) => {
              return (
                <div className="character-avatar" key={char.name}>
                  <img src={char.img} alt={char.name}/>
                </div>
              )
            })
          }
        </div>
        { currentDialog && currentDialog.next && currentDialog.next.length > 1 &&
          this.renderChoices(currentDialog)
        }
        { currentDialog && currentDialog.scene.store &&
          this.renderStore(currentDialog)
        }
        <div className="dialog-textbox">
          <div className="dialog-header">
            {!!currentDialog &&
              <span style={{ color: currentDialog.speaker.color }}>
                { currentDialog.speaker.name }
              </span>
            }
          </div>
          <div className="dialog-text">
            {!!currentDialog &&
              <span style={{ color: currentDialog.speaker.color }}>
                { currentDialog.text }
              </span>
            }
          </div>
          <div className="dialog-controls">
            { !isNextDisabled &&
              <span className="control-btn" onClick={() => this.continue()}>
                Next
                <i className="fas fa-chevron-right" />
              </span>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
  player: state.characters.player,
  currentDialog: state.currentDialog,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (DialogPanel)
