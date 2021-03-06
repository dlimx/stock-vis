import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCode, setData, addCompare } from '../redux/actionCreators'

import CandleChart from './render/CandleChart'
import DisplayDate from './render/DisplayDate'

// component to render stock info
class Stock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      info: '',
      err: '',
      chartMsg: '',
      range: 261,
      chart: '',
      load: ''
    }
    this.props.dispatch(setCode(this.props.match.params.id.toUpperCase()))
    this.update = this.update.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addCompare = this.addCompare.bind(this)
  }

  componentDidMount () {
    axios.get(`/api/code/${this.props.match.params.id}/${this.state.range}`)
      .then((res) => {
        this.setState({chart: <CandleChart />, info: res.data})
        let days = res.data.length
        if (days < this.state.range) {
          this.setState({chartMsg: <p style={{backgroundColor: '#D32F2F', color: '#FFFFFF'}}>Warning - the stock data is only ${days} old - insufficient to chart the whole time period.</p>})
        } else {
          this.setState({chartMsg: ''})
        }
        this.props.dispatch(setData(res.data))
      })
      .catch((err) => {
        console.log(err)
        this.setState({err: <span>The code {this.props.match.params.id.toUpperCase()} does not exist. <Link to='/'>Please try a new code.</Link></span>})
      })
  }

  update () {
    axios.get(`/api/code/${this.props.match.params.id}/${this.state.range}`)
      .then((res) => {
        this.setState({load: ''})
        this.props.dispatch(setData(res.data))
      })
      .catch((err) => {
        console.log(err)
        this.setState({err: <span>The code {this.props.match.params.id.toUpperCase()} does not exist. <Link to='/'>Please try a new code.</Link></span>})
      })
  }

  addCompare () {
    this.props.dispatch(addCompare(this.props.match.params.id.toUpperCase(), this.props.data.map((a) => {
      return [a[0], a[4]]
    })))
  }

  handleClick (e) {
    const id = parseInt(e.target.id.slice(1))
    this.setState({
      range: id,
      load: <div className='load' />
    })
    this.update(id)
  }

  render () {
    let msg, title, infoBox, buttons
    if (!this.props.match.params.id || this.props.match.params.id.toLowerCase() === 'undefined') {
      title = 'Search Error'
      msg = <Link to='/'>Please return and search for a code!</Link>
      this.props.dispatch(setCode(''))
    } else {
      let info = this.state.info
      let avg, diff, close, volume
      title = this.props.match.params.id.toUpperCase()
      if (this.state.err) {
        msg = this.state.err
      } else if (!info) {
        msg = 'Please wait, loading.'
      } else {
        msg = <span>Latest data are from yesterday, <DisplayDate date={info[0][0]} />.</span>
        if (info.length >= 261) {
          avg = Math.round(info.reduce((a, b) => { return a + b[5] }, 0) / 261)
        } else {
          avg = 'Stock not old enough'
        }

        diff = Math.round((info[0][4] - info[1][4]) / info[1][4] * 100000) / 100000
        if (diff > 0) {
          close = <h5>Close: {info[0][4]} <span style={{color: 'green', paddingLeft: '1rem'}}>{String.fromCharCode('9650')} {diff}%</span></h5>
        } else {
          close = <h5>Close: {info[0][4]} <span style={{color: 'red', paddingLeft: '1rem'}}>{String.fromCharCode('9660')} {diff}%</span></h5>
        }

        diff = Math.round((info[0][5] - info[1][5]) / info[1][5] * 100000) / 100000
        if (diff > 0) {
          volume = <h5>Volume: {info[0][5]} <span style={{color: 'green', paddingLeft: '1rem'}}>{String.fromCharCode('9650')} {diff}%</span></h5>
        } else {
          volume = <h5>Volume: {info[0][5]} <span style={{color: 'red', paddingLeft: '1rem'}}>{String.fromCharCode('9660')} {diff}%</span></h5>
        }

        infoBox = (
          <div className='row'>
            <div className='col-sm-6'>
              <h5>{close}</h5>
              <h5>Open: {info[0][1]}</h5>
              <h5>Prev. Close: {info[1][4]}</h5>
              <h5>Range (dy): {Math.round((info[0][2] - info[0][3]) * 100) / 100}</h5>
            </div>
            <div className='col-sm-6'>
              <h5>{volume}</h5>
              <h5>Average Volume (yr): {avg}</h5>
              <div className='centered'>
                <button className='button ' onClick={this.addCompare} id='n5'>+ Compare</button>
              </div>
            </div>
          </div>
        )

        buttons = (
          <div className='buttons' id='nSelect'>
            <div className='col-sm-2 col-xs-4'>
              <button className={'button ' + (this.state.range === 5 ? '' : 'button-outline')} onClick={this.handleClick} id='n5'>1 Week</button>
            </div>
            <div className='col-sm-2 col-xs-4'>
              <button className={'button ' + (this.state.range === 22 ? '' : 'button-outline')} onClick={this.handleClick} id='n22'>1 Month</button>
            </div>
            <div className='col-sm-2 col-xs-4'>
              <button className={'button ' + (this.state.range === 133 ? '' : 'button-outline')} onClick={this.handleClick} id='n133'>6 Months</button>
            </div>
            <div className='col-sm-2 col-xs-4'>
              <button className={'button ' + (this.state.range === 261 ? '' : 'button-outline')} onClick={this.handleClick} id='n261'>1 Year</button>
            </div>
            <div className='col-sm-2 col-xs-4'>
              <button className={'button ' + (this.state.range === 783 ? '' : 'button-outline')} onClick={this.handleClick} id='n783'>3 Years</button>
            </div>
            <div className='col-sm-2 col-xs-4'>
              <button className={'button ' + (this.state.range === 9999 ? '' : 'button-outline')} onClick={this.handleClick} id='n9999'>Maximum</button>
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        <div className='row centered'>
          <div className='col-md-8 col-md-offset-2'>
            <h1>{title}</h1>
            <h5>{msg}</h5>
          </div>
        </div>
        {infoBox}
        <div className='row'>
          <div className='col-xs-12'>
            <div>
              {this.state.chartMsg}
              {this.state.load}
              {this.state.chart}
            </div>
            <div className='row'>
              {buttons}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

Stock.propTypes = {
  match: React.PropTypes.object.isRequired,
  data: React.PropTypes.array,
  dispatch: React.PropTypes.func
}

export default connect(mapStateToProps)(Stock)
