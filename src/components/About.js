import React from 'react'

// main component About page
class About extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div className='row centered'>
          <div className='col-md-8 col-md-offset-2'>
            <h2>About</h2>
            <p>Here is a complete list of the stocks we have available, as sourced from <a href='https://www.quandl.com'>Quandl.</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default About
