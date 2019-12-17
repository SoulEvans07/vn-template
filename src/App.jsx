import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.scss'

import PlayerStatusBar from './components/PlayerStatusBar.jsx'
import DialogPanel from './components/DialogPanel.jsx'
import PlayerInventory from './components/PlayerInventory.jsx'

class App extends Component {

  render () {
    return (
      <div id="app" className="app">
        <PlayerStatusBar />
        <DialogPanel />
        <PlayerInventory />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  route: state.route
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (App)
