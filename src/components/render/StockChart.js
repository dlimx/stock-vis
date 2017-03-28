import React from 'react'
import { connect } from 'react-redux'
import ReactFauxDOM from 'react-faux-dom'

const d3 = Object.assign({}, require('d3-scale'), require('d3-selection'), require('d3-time-format'), require('d3-axis'), require('d3-path'), require('d3-shape'), require('d3-array'))

class StockChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chart: '',
      w: NaN,
      h: NaN
    }
  }

  componentDidMount () {
    let w = document.getElementsByClassName('svgContainer')[0].parentElement.offsetWidth - 30
    let h = (w / 2)
    this.setState({w: w, h: h})
  }

  render () {
    let data = this.props.data
    let parseTime = d3.timeParse('%Y-%m-%d')
    let w = this.state.w || 1000
    let h = this.state.h || 500
    let m = {top: 20, right: 30, bottom: 20, left: 50}

    let svgNode = ReactFauxDOM.createElement('div')
    let svg = d3.select(svgNode).append('svg').attr('width', w).attr('height', h)

    data.forEach((d) => {
      d[0] = parseTime(d[0])
    })

    let xScale = d3.scaleTime()
      .domain(d3.extent(data, (d) => { return d[0] }))
      .rangeRound([m.left, w - m.right])
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return d[1] })])
      .range([h - m.top, m.bottom])

    let xAxis = d3.axisBottom(xScale).tickSize(3).ticks(6).tickSizeOuter(0)
    let yAxisL = d3.axisLeft(yScale).tickSize(3).ticks(10)
    let yAxisR = d3.axisRight(yScale).tickSize(3).ticks(10)

    svg.append('g')
      .call(xAxis)
      .attr('transform', 'translate(0,' + (h - m.bottom) + ')')
      .select('.domain')
      .attr('stroke', '#606c76')

    svg.append('g')
      .call(yAxisL)
      .attr('transform', 'translate(' + m.left + ',0)')
      .select('.domain')
      .remove()

    svg
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', '1.8rem')
        .attr('x', -30)
        .attr('text-anchor', 'end')
        .text('Price (USD)')

    svg.append('g')
      .call(yAxisR)
      .attr('transform', 'translate(' + (w - m.right) + ',0)')
      .select('.domain')
      .remove()

    if (data.length > 2) {
      let line = d3.line()
                  .x((d, i) => {
                    return xScale(d[0])
                  })
                  .y((d) => {
                    return yScale(d[1])
                  })

      svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('stroke', '#9b4dca')
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('fill', 'none')
    }

    return (
      <div className='svgContainer'>
        {svgNode.toReact()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

StockChart.propTypes = {
  data: React.PropTypes.array.isRequired
}

export default connect(mapStateToProps)(StockChart)
