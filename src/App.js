import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'

class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Routes />
        </Router>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
