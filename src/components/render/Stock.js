import React from 'react'
import axios from 'axios'
import StockChart from './StockChart'

// component to render stock info
class Stock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      dates: [],
      closes: []
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
    let chart
    if (!this.state.data) {
      chart = 'loading'
    } else {
      chart = <StockChart {...this.state.data} />
    }

    return (
      <div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <h1>{this.props.match.params.id.toUpperCase()}</h1>
          </div>
        </div>
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
