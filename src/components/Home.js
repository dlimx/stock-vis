import React from 'react'

// main component for home
class Home extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <div id='title'>
          <h1>Stock-Vis</h1>
          <form>
            <label>
              <h4>Input your stock here:</h4>
              <input style={{'maxWidth': '700px'}} type='text' name='name' />
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}

export default Home
