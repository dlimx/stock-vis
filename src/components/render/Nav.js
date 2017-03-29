import React from 'react'
import onClickOutside from 'react-onclickoutside'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteCompare } from '../../redux/actionCreators'

// main component for navigation
class Nav extends React.Component {
  // sets up state
  constructor (props) {
    super(props)
    this.state = {class: 'responsive'}
    this.click = this.click.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete (e) {
    e.preventDefault()
    this.props.dispatch(deleteCompare(e.target.id))
  }

  // component itself - CSS based responsive design
  render () {
    let compareBox, compare
    if (this.props.comId.length) {
      compareBox = <h5 style={{display: 'inline'}}>Comparing: </h5>
      compare = this.props.comId.map((a, i) => {
        return <a href='#' onClick={this.handleDelete} id={a}>{a} </a>
      })
    }
    return (
      <div>
        <nav className={this.state.class}>
          <div className='responsive-menu'>
            <NavLink exact to='/' activeClassName='active'>Home</NavLink>
            <NavLink to='/about' activeClassName='active'>About</NavLink>
            { this.props.code ? <NavLink to={`/details/${this.props.code}`} activeClassName='active'>Details</NavLink> : ''}
            { this.props.comId.length > 1 ? <NavLink to='/compare' activeClassName='active'>Compare</NavLink> : ''}
            <a className='menu' onClick={this.click}><i className='icon-menu' /></a>
          </div>
          <div className='search'>
            <div />
          </div>
        </nav>
        { this.props.comId.length ? (
          <div className='compare'>
            {compareBox}
            {compare}
          </div>
          ) : ''}
        <footer><a href='https://www.davidli.io/'><img className='icon' src='/favicon/favicon-32x32.png' />David Li, 2017</a></footer>
      </div>
    )
  }
}

Nav.propTypes = {
  code: React.PropTypes.string,
  comId: React.PropTypes.array,
  dispatch: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    code: state.code,
    comId: state.comId
  }
}

export default connect(mapStateToProps)(onClickOutside(Nav))
