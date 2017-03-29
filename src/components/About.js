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
            <p>Stock-Vis keeps you up to date on the going-ons of the finanical world, providing fast and easy access to price trends and comparisons - at the touch of your fingertips.</p>
            <p>We can show you the world - of stocks - both in sets of individual data (conveniently as a candlestick graph for quick analysis) or as comparisons to other leading stocks</p>
            <p>We have daily stock data, sourced from <a href='https://www.quandl.com'>Quandl.</a></p>
            <img src='/sample.jpg' />
            <p>The application uses node.js for its back end, and React and Redux for its front end.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default About
