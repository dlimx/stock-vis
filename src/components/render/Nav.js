import React from 'react'
import onClickOutside from 'react-onclickoutside'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

// main component for navigation
class Nav extends React.Component {
  // sets up state
  constructor (props) {
    super(props)
    this.state = {class: 'responsive'}
    this.click = this.click.bind(this)
  }

  // click handler for button
  click (e) {
    if (this.state.class === 'responsive') {
      this.setState({class: 'responded'})
    } else {
      this.setState({class: 'responsive'})
    }
  }

  handleClickOutside (e) {
    if (this.state.class === 'responded') {
      this.setState({'class': 'responsive'})
    }
  }

  // component itself - CSS based responsive design
  render () {
    return (
      <div>
        <nav className={this.state.class}>
          <div className='responsive-menu'>
            <NavLink exact to='/' activeClassName='active'>Home</NavLink>
            <NavLink to='/about' activeClassName='active'>About</NavLink>
            <NavLink to={`/details/${this.props.code}`} activeClassName='active'>Details</NavLink>
            <a className='menu' onClick={this.click}><i className='icon-menu' /></a>
          </div>

        </nav>
        <footer><a href='https://www.davidli.io/'><img className='icon' src='/favicon/favicon-32x32.png' />Made by David Li, 2017</a></footer>
      </div>
    )
  }
}

Nav.propTypes = {
  code: React.PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    code: state.code
  }
}

export default connect(mapStateToProps)(onClickOutside(Nav))
