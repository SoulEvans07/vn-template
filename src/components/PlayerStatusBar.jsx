import React, { Component } from 'react'
import { connect } from 'react-redux'

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
                <span className="currency-amount">{curr[1].value}</span>
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
