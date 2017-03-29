import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addCompare } from '../../redux/actionCreators'

import axios from 'axios'

// card for links
class LinkCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: ''
    }
    this.addCompare = this.addCompare.bind(this)
  }

  componentDidMount () {
    let code = this.props.code.slice(this.props.code.indexOf('/') + 1)
    this.setState({code: code})
  }

  addCompare (e) {
    e.preventDefault()
    axios.get(`/api/compare/${this.state.code}/261`)
      .then((res) => {
        this.props.dispatch(addCompare(this.state.code, res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    let button
    if (this.props.compare) {
      button = <button className='button' onClick={this.addCompare} id='n5'>+ Compare</button>
    }
    return (
      <div>
        <Link to={`/details/${this.state.code}`}>
          <h3>{this.state.code}</h3>
          <p>{this.props.details}</p>
          {button}
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

LinkCard.propTypes = {
  code: React.PropTypes.string.isRequired,
  details: React.PropTypes.string.isRequired,
  compare: React.PropTypes.bool,
  dispatch: React.PropTypes.func
}

export default connect(mapStateToProps)(LinkCard)
