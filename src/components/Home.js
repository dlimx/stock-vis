import React from 'react'
import { connect } from 'react-redux'

import LinkCard from './render/LinkCard'

import { setCode } from '../redux/actionCreators'

import data from '../../public/data.json'

// main component for home
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchResults: [],
      searchMatch: false,
      display: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.handleSearch({target: {value: this.props.code}})
    if (this.props.error) {
      this.setState({error: 'Please enter a valid code.'})
    }
  }

  search (e) {
    e.preventDefault()
    if (this.state.searchMatch) {
      this.context.router.history.push(`/details/${this.state.searchTerm}`)
    } else {
      this.setState({error: 'Please enter a valid code.'})
    }
  }

  handleSearch (e) {
    this.props.dispatch(setCode(e.target.value))

    this.setState({ searchTerm: e.target.value, searchMatch: false, error: '' })
    let array, display

    if (!this.state.searchTerm) {
      display = <p>Please enter a search term!</p>
      return
    }

    array = data.codes.filter((a) => {
      if (`${a.code}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
        if (a.code.toUpperCase().slice(a.code.indexOf('/') + 1) === (this.state.searchTerm.toUpperCase())) {
          this.setState({searchMatch: a})
        }
        return true
      }
    })

    this.setState({ searchResults: array })

    if (this.state.searchResults.length === 0) {
      display = <p>There are no results!</p>
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

  render () {
    return (
      <div>
        <div id='title' className='centered'>
          <h1>Stock-Vis</h1>
          <form onSubmit={this.search}>
            <label>
              <h4>Search for a stock:</h4>
            </label>
            <input ref={input => input && input.focus()} style={{'maxWidth': '700px'}} type='text' placeholder='i.e. GOOG, APPL' value={this.props.code} onChange={this.handleSearch} />
            <br />
            <input type='submit' value='Submit' />
            <br />
            {this.state.error}
          </form>

          <div className='row'>
            {this.state.display}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.code
  }
}

Home.propTypes = {
  code: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.string
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Home)
