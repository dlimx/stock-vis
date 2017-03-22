import React from 'react'

// main component for home
class Home extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div>
          <h1>React-Boilerplate</h1>
          <h5>Let's build a brighter tomorrow - together.</h5>
        </div>
      </div>
    )
  }
}

export default Home
