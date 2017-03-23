import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Details from './components/Details'

import Stock from './components/render/Stock'
import Compare from './components/render/Compare'
import NotFound from './components/render/NotFound'
import Nav from './components/render/Nav'

class Routes extends React.Component {
  render () {
    return (
      <div>
        <Route path='/' component={Nav} />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' exact component={About} />
            <Route path='/details' exact component={Details} />
            <Route path='/details/:id' component={Stock} />
            <Route path='/compare' component={Compare} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Routes
