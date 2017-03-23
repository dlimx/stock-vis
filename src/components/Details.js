import React from 'react'

// main component for Details page
class Details extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <h2>Info</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
