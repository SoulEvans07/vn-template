import React, { Component } from 'react'
import './App.scss'

import Player from './models/Player'
import Currency from './models/Currency'
import Stat from './models/Stat'
import DialogItem from './models/DialogItem'
import Character from './models/Character'

import PlayerStatusBar from './components/PlayerStatusBar.jsx'
import DialogPanel from './components/DialogPanel.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    const player = new Player('Soul', '#2c3e50')
    const emma = new Character('Emma', process.env.PUBLIC_URL + '/female_01/FS1-default.png', '#ff3355')
    const lucy = new Character('Lucy', process.env.PUBLIC_URL + '/female_02/school/Default.png', '#ab0fff')

    player.stats.charisma = new Stat('Charisma', 'CHAR', 10)
    player.stats.intelligence = new Stat('Intelligence', 'INT', 10)
    player.stats.strength = new Stat('Strength', 'STR', 10)
    player.stats.luck = new Stat('Luck', 'LCK', 10)

    player.wallet.yen = new Currency('Yen', '¥', 5000)
    player.wallet.diamond = new Currency('Diamond', '💎')

    // character, text, next, options
    const story = {
      "01": new DialogItem(player, "Hello Emma!", "02", {
        participants: [emma]
      }),
      "02": new DialogItem(emma, `Hello ${player.name}!`, "03", {
        participants: [emma]
      }),
      "03": new DialogItem(lucy, "Hey! Don't leave without me!", [ "03-1", "03-2" ], {
        participants: [emma]
      }),
      "03-1": new DialogItem(player, "(Leave)", "03-1-1", {
        participants: [emma],
        condition: {
          check: {
            typeField: "stats",
            itemField: "charisma",
            displayNameField: "short",
            valueField: "_value",
            value: 9
          }
        }
      }),
      "03-2": new DialogItem(player, "(Wait for her)", "03-2-1", {
        participants: [emma]
      }),
      "03-1-1": new DialogItem(player, `Let's go ${emma.name}`, null, {
        participants: [emma]
      }),
      "03-2-1": new DialogItem(player, "Quick, we ain't got all day to do this", "03-2-2", {
        participants: [emma]
      }),
      "03-2-2": new DialogItem(emma, "Actually we do...", "03-2-3", {
        participants: [emma]
      }),
      "03-2-3": new DialogItem(lucy, "Thanks for waiting!", null, {
        participants: [emma, lucy]
      })
    }

    this.state = {
      player,
      story
    }
  }

  render () {
    const { player, story } = this.state

    return (
      <div className="app">
        <PlayerStatusBar player={player} />
        <DialogPanel
          story={story}
          player={player}
        />
      </div>
    )
  }
}

export default App
