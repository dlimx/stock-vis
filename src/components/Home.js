import React from 'react'

import LinkCard from './render/LinkCard'
import data from '../../public/data.json'

// main component for home
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchResults: [],
      display: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  search (e) {
    e.preventDefault()
  }

  handleSearch (e) {
    this.setState({ searchTerm: e.target.value })
    let array = data.codes.filter((a) => { return (`${a.code} ${a.details}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) })
    this.setState({ searchResults: array })
    let display
    if (this.state.searchResults.length < 5) {
      display = this.state.searchResults.map((code, i) => (<LinkCard {...code} key={i} id={i} />))
      this.setState({ display: display })
    } else {
      display = <p>There are too many search results!</p>
      this.setState({display: display})
    }
  }

  render () {
    // fix this with server-side
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
          </form>

          <div className='row'>
            {this.state.display}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
