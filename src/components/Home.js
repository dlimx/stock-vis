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
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  search (e) {
    e.preventDefault()
    axios.get(
      `https://www.quandl.com/api/v3/datasets/WIKI/FB/data.csv?column_index=4&exclude_column_names=true&rows=3&start_date=2012-11-01&end_date=2013-11-30&order=asc&collapse=quarterly&transform=rdiff`
    ).then((res) => {
      this.setState({data: res})
    })
  }

  handleSearch (e) {
    this.setState({ searchTerm: e.target.value })
  }

  render () {
    return (
      <div>
        <div id='title'>
          <h1>Stock-Vis</h1>
          <form onSubmit={this.search}>
            <label>
              <h4>Search for a stock:</h4>
            </label>
            <input style={{'maxWidth': '700px'}} type='text' placeholder='i.e. GOOG, APPL' value={this.state.searchTerm} onChange={this.handleSearch} />
            <input type='submit' value='Submit' />

            <div className='row'>
              <pre><code>{JSON.stringify(this.state.data, 4)}</code></pre>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Home
