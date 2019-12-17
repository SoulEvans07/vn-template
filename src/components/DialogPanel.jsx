import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './DialogPanel.scss'
import * as dialogActions from '../actions/dialogActions'
import * as dialogHelpers from '../helpers/dialogHelpers'
import story from '../data/story'
import itemMap from '../data/items'
import currencies from '../data/currencies'
import { storyStart } from '../data/story'

class DialogPanel extends Component{
  constructor(props) {
    super(props)

    if (props.currentDialog === null) {
      props.actions.setDialog([storyStart])
    }

    this.state = {
      selectedItem: null
    }

    this.continue = this.continue.bind(this)
    this.selectItem = this.selectItem.bind(this)
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

  selectItem(item) {
    return (event) => {
      event.stopPropagation()
      this.setState({ selectedItem: item })
    }
  }

  buy() {
    const { currentDialog, actions } = this.props
    const { selectedItem } = this.state
    actions.buyItem('player', currentDialog.scene.store, selectedItem)
  }

  renderOption(option, index) {
    const { player } = this.props

    let text = option.text
    let isDisabled = false
    if (option.condition != null) {
      const { condition } = option
      text = `[${player[condition.typeField][condition.propField][condition.displayNameField]}` +
        `  ${player[condition.typeField][condition.propField].value}/${condition.value}] ${text}`

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

  renderItem(item, index) {
    const { player } = this.props
    if (item !== null) {
      const displayName = itemMap[item.name].displayName
      const description = itemMap[item.name].description
      const amount = item.amount
      const symbol = currencies[item.price.currency].symbol
      const price = item.price.amount
      const haveEnoughMoney = price <= player.wallet[item.price.currency]
      const outOfStock = amount <= 0

      return (
        <div className={`item-card ${amount !== 0 && haveEnoughMoney ? '' : 'disabled'}` } key={item.name + index} title={description}
          onClick={this.selectItem(item)} >
          <img className="image" src={itemMap[item.name].img} alt={item.name}/>
          {amount !== undefined && <div className={`amount-label ${outOfStock ? 'out-of-stock' : ''}`}>{`${amount}`}</div>}
          <div className={`price-label ${haveEnoughMoney ? '' : 'not-enough-money'}`}>{`${symbol}${price}`}</div>
          <div className="name-label">
            <span className="text">{`${displayName}`}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="item-card" key={`empty-${index}`}></div>
      )
    }
  }

  renderStore(dialog) {
    const { selectedItem } = this.state
    const { actions } = this.props
    const { items } = dialog.scene.store

    const exitStoreOption = story[dialog.next[0]]
    const selectedItemDescription = selectedItem !== null ? itemMap[selectedItem.name].description : null
    let selectedStoreItem = null
    if (selectedItem) {
      selectedStoreItem = { ...selectedItem, ...items[selectedItem.name] }
    }

    return (
      <div className="store dialog-options">
        <div className="store-front" onClick={this.selectItem(null)}>
          { Object.entries(items).map((entry, index) => {
            const item = { name: entry[0], ...entry[1] }
            return this.renderItem(item, index)
          })}
        </div>
        <div className="item-description">
          { this.renderItem(selectedStoreItem) }
          <div className="description">{ selectedItemDescription }</div>
        </div>
        <div className={`option ${selectedItem === null ? 'disabled' : ''}`}
          onClick={() => selectedItem && this.buy()}>
          Buy
        </div>
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
                <div className="character-avatar" key={char.name}
                  style={char.position}>
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
  player: state.characters.player,
  currentDialog: state.currentDialog,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (DialogPanel)
