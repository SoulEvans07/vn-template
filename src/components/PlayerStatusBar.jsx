import React, { Component } from 'react'
import { connect } from 'react-redux'

import currencies from '../data/currencies'

import './PlayerStatusBar.scss'

class PlayerStatusBar extends Component {
  render() {
    const { player } = this.props

    return (
      <div className="player-statusbar">
        <span className="player-name">{player.name}</span>
        <span className="player-wallet">
          {!!player.wallet && Object.entries(player.wallet).map(curr => {
            const name = curr[0]
            const value = curr[1]
            return (
              <span className="currency" key={name}>
                <span className="currency-short">{currencies[name].symbol}</span>
                <span className="currency-amount">{value}</span>
              </span>
            )
          })}
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.characters.player
})

export default connect(mapStateToProps, null) (PlayerStatusBar)
