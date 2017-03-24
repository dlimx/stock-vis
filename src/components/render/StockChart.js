import React from 'react'
import Faux from 'react-faux-dom'

const d3 = Object.assign({}, require('d3-scale'), require('d3-selection'), require('d3-time-format'), require('d3-axis'), require('d3-shape'), require('d3-array'))

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

    let w = 1140
    let h = 500

    let xScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d, i) => { return i })])
      .range([w, 0])
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return d[4] })])
      .range([0, h])

    let svg = d3.select(faux).append('svg').attr('width', w).attr('height', h)

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', (d) => {
        return yScale(d[4])
      })
      .attr('width', w / data.length)
      .attr('x', (d, i) => { return xScale(i) })
      .attr('y', (d) => { return h - yScale(d[4]) })
      .attr('fill', (d) => { return 'rgb(0,0,' + parseInt((d[4] - 60) * 4) + ')' })
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
