import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCode } from '../redux/actionCreators'

import StockChart from './render/StockChart'
import DisplayDate from './render/DisplayDate'

// component to render stock info
class Stock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      err: '',
      chart: '',
      range: 261
    }
    this.props.dispatch(setCode(this.props.match.params.id.toUpperCase()))
    this.update = this.update.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    axios.get(`/api/code/${this.props.match.params.id}/${this.state.range}`)
      .then((res) => {
        this.setState({data: res.data.dataset_data.data, chart: <StockChart data={res.data.dataset_data.data} key={this.state.range} />})
      })
      .catch((err) => {
        console.log(err)
        this.setState({err: <span>The code {this.props.match.params.id.toUpperCase()} does not exist. <Link to='/'>Please try a new code.</Link></span>})
      })
  }

  update () {
    axios.get(`/api/code/${this.props.match.params.id}/${this.state.range}`)
      .then((res) => {
        this.setState({chart: <StockChart data={res.data.dataset_data.data} key={this.state.range} />})
      })
      .catch((err) => {
        console.log(err)
        this.setState({err: <span>The code {this.props.match.params.id.toUpperCase()} does not exist. <Link to='/'>Please try a new code.</Link></span>})
      })
  }

  handleClick (e) {
    const id = parseInt(e.target.id.slice(1))
    this.setState({range: id})
    this.update(id)
  }

  render () {
    let data = this.state.data
    let info, msg, avg, diff, close, volume
    if (this.state.err) {
      msg = this.state.err
    } else if (!data) {
      msg = 'Please wait, loading.'
    } else {
      msg = <span>Latest data are from yesterday, <DisplayDate date={data[0][0]} />.</span>
      if (data.length >= 261) {
        avg = Math.round(data.reduce((a, b) => { return a + b[5] }, 0) / 261)
      } else {
        avg = 'Stock not old enough'
      }

      diff = Math.round((data[0][4] - data[1][4]) / data[1][4] * 100000) / 100000
      if (diff > 0) {
        close = <h5>Close: {data[0][4]} <span style={{color: 'green', paddingLeft: '1rem'}}>{String.fromCharCode('9650')} {diff}%</span></h5>
      } else {
        close = <h5>Close: {data[0][4]} <span style={{color: 'red', paddingLeft: '1rem'}}>{String.fromCharCode('9660')} {diff}%</span></h5>
      }

      diff = Math.round((data[0][5] - data[1][5]) / data[1][5] * 100000) / 100000
      if (diff > 0) {
        volume = <h5>Volume: {data[0][5]} <span style={{color: 'green', paddingLeft: '1rem'}}>{String.fromCharCode('9650')} {diff}%</span></h5>
      } else {
        volume = <h5>Volume: {data[0][5]} <span style={{color: 'red', paddingLeft: '1rem'}}>{String.fromCharCode('9660')} {diff}%</span></h5>
      }

      info = (
        <div className='row'>
          <div className='col-sm-6'>
            <h5>{close}</h5>
            <h5>Open: {data[0][1]}</h5>
            <h5>Prev. Close: {data[1][4]}</h5>
          </div>
          <div className='col-sm-6'>
            <h5>{volume}</h5>
            <h5>Average Volume (yr): {avg}</h5>
            <h5>Range (dy): {Math.round((data[0][2] - data[0][3]) * 100) / 100}</h5>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className='row centered'>
          <div className='col-md-8 col-md-offset-2'>
            <h1>{this.props.match.params.id.toUpperCase()}</h1>
            <h5>{msg}</h5>
          </div>
        </div>
        {info}
        <div className='row'>
          <div className='col-xs-12'>
            <div>
              {this.state.chart}
            </div>
            <div className='row'>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.code
  }
}

Stock.propTypes = {
  match: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func
}

export default connect(mapStateToProps)(Stock)
