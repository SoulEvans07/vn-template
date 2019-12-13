import React, { Component, Fragment } from 'react'
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
              <Fragment key={name}>
                <span className="currency">
                  <span className="currency-short">{currencies[name].symbol}</span>
                  <span className="currency-amount">{value}</span>
                </span>
                {!!player.transactions && !!player.transactions[name] && player.transactions[name].map((trans, index) => {
                  let transValue = trans
                  let color = 'rgba(0, 218, 0, 0.8)'
                  let sign = '+'
                  if (transValue < 0) {
                    transValue = -transValue
                    color = 'rgba(218, 0, 0, 0.8)'
                    sign = '-'
                  }
                  return (
                    <span className="change" key={`${trans}${name}-${index}`}
                      style={{background: color}} onAnimationEnd={() => player.transactions[name].splice( player.transactions[name].indexOf(trans), 1 )}>
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
  player: state.characters.player
})

export default connect(mapStateToProps, null) (PlayerStatusBar)
