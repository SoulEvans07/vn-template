import React, { Component } from 'react'
import './PlayerStatusBar.scss'

class PlayerStatusBar extends Component {
  render() {
    const { player } = this.props

    return (
      <div className="player-statusbar">
        <span className="player-name">{player.name}</span>
        <span className="player-wallet">
          {!!player.wallet && Object.entries(player.wallet).map(curr => {
            return (
              <span className="currency" key={curr[0]}>
                <span className="currency-short">{curr[1].symbol}</span>
                <span className="currency-amount">{curr[1].getValue()}</span>
              </span>
            )
          })}
        </span>
      </div>
    )
  }
}

export default PlayerStatusBar
