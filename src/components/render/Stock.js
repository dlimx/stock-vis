import React from 'react'
import axios from 'axios'
import StockChart from './StockChart'

// component to render stock info
class Stock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${this.props.match.params.id}/data.json?api_key=PkKKxSJVBs2vP8_zkUb_&rows=365`)
      .then((res) => {
        this.setState({data: res.data.dataset_data})
      })
  }

  render () {
    let chart, info, date, avg
    let data = this.state.data
    if (!data) {
      chart = 'loading'
    } else {
      if (data.data.length >= 365) {
        avg = Math.round(data.data.reduce((a, b) => { return a + b[5] }, 0) / 365)
      } else {
        avg = 'Stock not old enough'
      }

      chart = <StockChart {...data} />
      info = (
        <div className='row'>
          <div className='col-md-6'>
            <h5>Close: {data.data[0][4]}</h5>
            <h5>Open: {data.data[0][1]}</h5>
            <h5>Prev. Close: {data.data[1][4]}</h5>
          </div>
          <div className='col-md-6'>
            <h5>Volume: {data.data[0][5]}</h5>
            <h5>Average Volume (yr): {avg}</h5>
            <h5>Range (dy): {Math.round((data.data[0][2] - data.data[0][3]) * 100) / 100}</h5>
          </div>
        </div>
      )
      date = data.data[0][0]
    }

    return (
      <div>
        <div className='row centered'>
          <div className='col-md-8 col-md-offset-2'>
            <h1>{this.props.match.params.id.toUpperCase()}</h1>
            <h5>Latest data are from yesterday, {date}.</h5>
          </div>
        </div>
        {info}
        <div className='row'>
          <div className='col-md-12'>
            {chart}
          </div>
        </div>
      </div>
    )
  }
}

Stock.propTypes = {
  match: React.PropTypes.object.isRequired
}

export default Stock
