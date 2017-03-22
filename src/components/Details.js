import React from 'react'

// main component for Details page
class Details extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div>
          <h2>Details</h2>
          <p>Here are some of the best (or worst!) things I've created.</p>
        </div>
      </div>
    )
  }
}

export default Details
