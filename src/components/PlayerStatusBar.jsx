import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import currencies from '../data/currencies'
import * as dialogActions from '../actions/dialogActions'
import * as routeActions from '../actions/routeActions'

import './PlayerStatusBar.scss'

class PlayerStatusBar extends Component {
  constructor(props) {
    super(props)

    this.openInventory = this.openInventory.bind(this)
  }

  openInventory() {
    const { actions, route } = this.props

    if (route !== '/inventory') {
      actions.setRoute('/inventory')
    } else {
      actions.backRoute()
    }
  }

  render() {
    const { player, actions, route } = this.props
    const inventoryOpen = route === '/inventory'

    return (
      <div className="player-statusbar">
        <div className="navbar-menu">
          <span className={`menu-item invnetory-btn ${inventoryOpen ? 'open' : ''}`}
            onClick={() => this.openInventory()}>
            Inventory
          </span>
        </div>
        <span className="player-wallet">
          {!!player.wallet && Object.entries(player.wallet).map(curr => {
            const name = curr[0]
            const value = curr[1]
            return (
              <Fragment key={name}>
                <span className="currency">
                  <span className="currency-short">{currencies[name].symbol}</span>
                  <span className="currency-amount">{value}</span>
                </span>
                {!!player.transactions && !!player.transactions[name] && player.transactions[name].map((trans, index) => {
                  let transValue = trans.value
                  let color = 'rgba(0, 218, 0, 0.8)'
                  let sign = '+'
                  if (transValue < 0) {
                    transValue = -transValue
                    color = 'rgba(218, 0, 0, 0.8)'
                    sign = '-'
                  }
                  return (
                    <span className="change" key={`${trans._id}`}
                      style={{background: color}} onAnimationEnd={() => { actions.removeTransaction('player', trans) }}>
                      <span className="change-sign">{sign}</span>
                      <span className="change-short">{currencies[name].symbol}</span>
                      <span className="change-amount">{transValue}</span>
                    </span>
                  )
                })}
              </Fragment>
            )
          })}
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.characters.player,
  route: state.route
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...dialogActions, ...routeActions }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (PlayerStatusBar)
