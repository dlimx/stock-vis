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
            <p>We have daily stock data, sourced from <a href='https://www.quandl.com'>Quandl.</a></p>
            <p>An example is shown below: </p>
            <img src='/public/sample.jpg' />
            <p>Technically, the server has a node.js backend, and a React front end.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default About
