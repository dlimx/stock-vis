import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import Routes from './Routes'

class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Provider store={store}>
            <Routes />
          </Provider>
        </Router>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
