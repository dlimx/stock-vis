import React from 'react'
import axios from 'axios'

// component to render stock info
class Stock extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <h2>Info</h2>
            <pre><code>{this.props.match.params.id}</code></pre>
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
