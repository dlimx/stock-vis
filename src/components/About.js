import React from 'react'

// main component About page
class About extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div>
          <h2>About Me</h2>
        </div>
      </div>
    )
  }
}

export default About
