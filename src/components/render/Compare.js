import React from 'react'

// main component for Compare page
class Compare extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div>
          <h2>Compare</h2>
          <p>These are some of the biggest stocks</p>
        </div>
      </div>
    )
  }
}

export default Compare
