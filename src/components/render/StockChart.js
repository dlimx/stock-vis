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
    const data = this.props.data.map((a) => { return [a[0], a[4]] })

    let m = {top: 20, right: 20, bottom: 20, left: 40}
    let w = document.getElementsByClassName('container')[0].offsetWidth - 30
    let h = (w / 2)

    let xScale = d3.scaleTime()
      .domain([0, d3.max(data, (d, i) => { return i })])
      .rangeRound([m.left, w - m.right])
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return d[1] })])
      .range([h - m.top, m.bottom])

    let parseTime = d3.timeParse('%y-%b-%d')

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    let svg = d3.select(faux).append('svg').attr('width', w).attr('height', h)

    svg.append('g').call(xAxis).attr('transform', 'translate(0,' + (h - m.bottom) + ')')
    svg.append('g').call(yAxis).attr('transform', 'translate(' + m.left + ',0)')

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', (d) => {
        return (yScale(0) - yScale(d[1]))
      })
      .attr('width', w / data.length)
      .attr('x', (d, i) => { return xScale(i) })
      .attr('y', (d) => { return yScale(d[1]) })
      .attr('fill', (d) => { return '#CCC' })
  },

  render () {
    return (
      <div>
        <h2>Here is some fancy data:</h2>
        <div className='renderedD3'>
          {this.state.chart}
        </div>
      </div>
    )
  }
})

export default StockChart
