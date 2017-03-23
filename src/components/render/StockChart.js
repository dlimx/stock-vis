import React from 'react'
import Faux from 'react-faux-dom'

const d3 = Object.assign({}, require('d3-scale'), require('d3-selection'), require('d3-time-format'), require('d3-axis'), require('d3-shape'))

const {array} = React.PropTypes

const StockChart = React.createClass({
  propTypes: {
    data: array.isRequired
  },

  mixins: [
    Faux.mixins.core
  ],

  componentDidMount () {
    const faux = this.connectFauxDOM('div.renderedD3', 'chart')
    const data = this.props.data

    let w = 1000
    let h = 500

    d3.select(faux).append('svg').attr('width', w).attr('height', h)

    d3.select('svg').data(data)
      .enter()
      .append('rect')
      .attr('height', (d) => {
        return d[4]
      })
  },

  render () {
    return (
      <div>
        <h2>Here is some fancy data:</h2>
        <div className='renderedD3'>
          {this.state.chart}
        </div>

        <pre><code>
          {JSON.stringify(this.props.data, null, 4)}
        </code></pre>
      </div>
    )
  }
})

export default StockChart
