import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactFauxDOM from 'react-faux-dom'
import randomColor from 'randomcolor'

const d3 = Object.assign({}, require('d3-scale'), require('d3-selection'), require('d3-selection-multi'), require('d3-axis'), require('d3-path'), require('d3-shape'), require('d3-array'))

class LineChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chart: '',
      w: NaN,
      h: NaN
    }
  }

  componentDidMount () {
    let w = document.getElementsByClassName('svgContainer')[0].parentElement.offsetWidth
    let h = (w / 2)
    this.setState({w: w, h: h})
  }

  render () {
    let w = this.state.w || 1000
    let h = this.state.h || 500
    let m = {top: 40, right: 30, bottom: 20, left: 50}

    let svgNode = ReactFauxDOM.createElement('div')

    let array = this.props.comData
    let keys = this.props.comId

    if (array && keys.length > 1) {
      let svg = d3.select(svgNode).append('svg').attr('width', w).attr('height', h)
      let ref = d3.select(svgNode).append('svg').attr('width', w).attr('height', 100)

      keys.sort((a, b) => {
        return array[b].cData.length - array[a].cData.length
      })

      let xScale = d3.scaleTime()
      .domain(d3.extent(array[keys[0]].cData, (d) => { return d[0] }))
      .rangeRound([m.left, w - m.right])

      let yScale = d3.scaleLinear()
      .domain([0, d3.max(array[keys[0]].cData, (d) => { return d[1] })])
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
      .attr('transform', `translate(${m.left},${m.top / 2})`)
      .select('.domain')
      .remove()

      svg.append('g')
      .call(yAxisR)
      .attr('transform', `translate(${w - m.right},${m.top / 2})`)
      .select('.domain')
      .remove()

      svg.append('text')
        .attrs({
          transform: 'rotate(-90)',
          y: '1.8rem',
          x: -30,
          'text-anchor': 'end'
        })
        .text('Price (USD)')

      keys.forEach((a, i) => {
        let data = array[a].cData
        let color = randomColor({luminosity: 'dark'})

        data.forEach((d) => {
          d[0] = new Date(d[0])
          d[1] = d[1] / data[data.length - 1][1]
        })

        data.sort((a, b) => { return a[0] - b[0] })

        let line = d3.line()
                .x((d, i) => {
                  return xScale(d[0])
                })
                .y((d) => {
                  return yScale(d[1])
                })

        svg.append('path')
        .datum(data, i)
        .attrs({
          d: line,
          stroke: color,
          'stroke-width': 3,
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round',
          'fill': 'none',
          transform: `translate(${0},${m.top / 2})`
        })

        ref.append('rect')
          .attrs({
            x: i * 50 + 20,
            y: 10,
            width: 30,
            height: 30,
            fill: color
          })

        ref.append('text')
          .attrs({
            y: 60,
            x: (i * 50 + 35),
            'text-anchor': 'middle'
          }).text(a)
      })
    } else {
      d3.select(svgNode).append('h3').attr('style', {'zIndex': 1000}).html(React.createElement(
          Link,
          { to: '/' },
          'That didn\'t work - please add more codes!'
        ))
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
    comId: state.comId,
    comData: state.comData
  }
}

LineChart.propTypes = {
  comId: React.PropTypes.array,
  comData: React.PropTypes.object
}
export default connect(mapStateToProps)(LineChart)
