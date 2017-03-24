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
      searchDetails: false,
      searchMatch: false,
      display: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDetails = this.handleDetails.bind(this)
    this.handleDetails2 = this.handleDetails2.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  search (e) {
    e.preventDefault()
  }

  handleSearch (e) {
    this.setState({ searchTerm: e.target.value, searchMatch: false })
    let array
    if (this.state.searchDetails) {
      array = data.codes.filter((a) => {
        if (`${a.code} ${a.details}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
          if (a.code.toUpperCase().slice(a.code.indexOf('/') + 1) === (this.state.searchTerm.toUpperCase())) {
            this.setState({searchMatch: a})
          }
          return true
        }
      })
    } else {
      array = data.codes.filter((a) => {
        if (`${a.code}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
          if (a.code.toUpperCase().slice(a.code.indexOf('/') + 1) === (this.state.searchTerm.toUpperCase())) {
            this.setState({searchMatch: a})
          }
          return true
        }
      })
    }

    this.setState({ searchResults: array })
    let display
    if (this.state.searchTerm.length === 0) {
      display = <p>Please enter a search term!</p>
    } else if (this.state.searchResults.length === 0) {
      display = <p>There are no results! <a onClick={this.handleDetails2} href=''>Perhaps try searching the descriptions too?</a></p>
    } else if (this.state.searchResults.length < 25) {
      if (this.state.searchMatch) {
        display = <div>
          <LinkCard {...this.state.searchMatch} />
          <hr />
          {this.state.searchResults
            .filter((a) => {
              if (a.code === this.state.searchMatch.code) {
                return false
              } else {
                return true
              }
            })
            .map((code, i) => (<LinkCard {...code} key={i} id={i} />))}
        </div>
      } else {
        display = this.state.searchResults.map((code, i) => (<LinkCard {...code} key={i} id={i} />))
      }
    } else if (this.state.searchMatch) {
      display = <div>
        <LinkCard {...this.state.searchMatch} />
        <hr />
        <p>There are too many other search results!</p>
      </div>
    } else {
      display = <p>There are too many search results!</p>
    }
    this.setState({display: display})
  }

  handleDetails (e) {
    if (!this.state.searchDetails) {
      this.setState({ searchDetails: true })
    } else {
      this.setState({ searchDetails: false })
    }
    this.handleSearch({target: {value: this.state.searchTerm}})
  }

  handleDetails2 (e) {
    e.preventDefault()
    document.getElementById('details').checked = !document.getElementById('details').checked
    this.handleDetails(e)
  }

  render () {
    // fix this with server-side
    return (
      <div>
        <div id='title' className='centered'>
          <h1>Stock-Vis</h1>
          <form onSubmit={this.search}>
            <label>
              <h4>Search for a stock:</h4>
            </label>
            <input style={{'maxWidth': '700px'}} type='text' placeholder='i.e. GOOG, APPL' value={this.state.searchTerm} onChange={this.handleSearch} />
            <br />

            <span>Search Descriptions: <input type='checkbox' value={this.state.searchDetails} id='details' onChange={this.handleDetails} /></span>
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
