import React from 'react'

// component to render stock info
class Stock extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
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
