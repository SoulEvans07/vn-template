import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import itemMap from '../data/items'

import './PlayerInventory.scss'

class PlayerInventory extends Component {

  renderItem(item, index) {
    const displayName = itemMap[item.name].displayName
    const description = itemMap[item.name].description
    const amount = item.amount

    return (
      <div className={`item-card ${amount !== 0 ? '' : 'disabled'}` } key={item.name + index} title={description}>
        <img className="image" src={itemMap[item.name].img} alt={item.name}/>
        {amount !== undefined && <div className="amount-label">{`${amount}`}</div>}
        <div className="name-label">
          <span className="text">{`${displayName}`}</span>
        </div>
      </div>
    )
  }

  render() {
    const { route } = this.props
    const { inventory } = this.props.player

    const sortedInventory = Object.entries(inventory).sort((a, b) => a[0].localeCompare(b[0]))

    return (
      <div className="player-inventory-view" style={route === '/inventory' ? { zIndex: 10 } : null }>
        <div className="inventory">
          { sortedInventory.map((entry, index) => {
            const item = { name: entry[0], ...entry[1] }
            return (
              this.renderItem(item, index)
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.characters.player,
  route: state.route,
  currentDialog: state.currentDialog,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (PlayerInventory)
