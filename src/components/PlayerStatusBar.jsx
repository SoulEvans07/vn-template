import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import currencies from '../data/currencies'
import * as dialogActions from '../actions/dialogActions'

import './PlayerStatusBar.scss'

class PlayerStatusBar extends Component {
  render() {
    const { player, actions } = this.props

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
  player: state.characters.player
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...dialogActions }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (PlayerStatusBar)
