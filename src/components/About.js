import React from 'react'

// main component About page
class About extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <h2>About</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default About
