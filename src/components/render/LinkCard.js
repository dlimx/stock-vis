import React from 'react'
import { Link } from 'react-router-dom'

// card for links
class LinkCard extends React.Component {
  render () {
    let code = this.props.code.slice(this.props.code.indexOf('/') + 1)
    return (
      <div>
        <Link to={`/details/${code}`}>
          <h3>{code}</h3>
          <p>{this.props.details}</p>
        </Link>
      </div>
    )
  }
}

LinkCard.propTypes = {
  code: React.PropTypes.string.isRequired,
  details: React.PropTypes.string.isRequired
}

export default LinkCard
