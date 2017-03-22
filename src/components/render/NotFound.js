import React from 'react'
import { Link } from 'react-router-dom'

// component for broken links
class NotFound extends React.Component {
  render () {
    return (
      <div>
        <div className='card'>
          <h3>404 page not found</h3>
          <p>I'm sorry, but you got an error. Maybe I messed up a link. Or maybe you typed something wrong.</p>
          <p>Let's try again, shall we?</p>
        </div>

        <Link className='card' to='/'>Return Home</Link>
      </div>
    )
  }
}

export default NotFound
