import React from 'react'
import axios from 'axios'

// main component for home
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      data: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  handleSearch (e) {
    this.setState({ searchTerm: e.target.value })
    axios.get('http://dev.markitondemand.com/Api/v2/Lookup/jsonp/', {
      params: {
        input: this.state.searchTerm
      }
    }).then(function (res) {
      var tempData
      res.forEach((i) => {
        tempData.push(i)
      })
      this.setState({data: tempData})
    })
  }

  render () {
    return (
      <div>
        <div id='title'>
          <h1>Stock-Vis</h1>
          <form>
            <label>
              <h4>Search for a stock:</h4>
            </label>
            <input style={{'maxWidth': '700px'}} type='text' placeholder='i.e. GOOG, APPL' value={this.state.searchTerm} onChange={this.handleSearch} />
            <input type='submit' value='Submit' />

            <pre><code>{JSON.stringify(this.state.data, 4)}</code></pre>
          </form>
        </div>
      </div>
    )
  }
}

export default Home
