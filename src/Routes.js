import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

import Home from './components/Home'
import About from './components/About'
import Stock from './components/Stock'
import Compare from './components/Compare'

import NotFound from './components/render/NotFound'
import Nav from './components/render/Nav'

class Routes extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          {typeof window !== 'undefined' && (window.React = React)}
          <Route path='/' component={Nav} />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/about' exact component={About} />
              <Route path='/details' exact render={() =>
                <Redirect to='/' />}
                />
              <Route path='/details/:id' component={Stock} />
              <Route path='/compare' component={Compare} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Provider>
    )
  }
}

export default Routes
