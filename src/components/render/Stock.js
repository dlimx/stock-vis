import React from 'react'
import axios from 'axios'

// component to render stock info
class Stock extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
    axios.get()
  }

  render () {
    var data
    return (
      <div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <h2>Info</h2>
            <pre><code>{JSON.stringify(data, 4)}</code></pre>
          </div>
        </div>
      </div>
    )
  }
}

export default Stock
