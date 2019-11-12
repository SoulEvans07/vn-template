import React, { Component } from 'react'
import './App.scss'

import PlayerStatusBar from './components/PlayerStatusBar.jsx'
import DialogPanel from './components/DialogPanel.jsx'

class App extends Component {

  render () {
    return (
      <div className="app">
        <PlayerStatusBar />
        <DialogPanel />
      </div>
    )
  }
}

export default App
