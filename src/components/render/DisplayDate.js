import React from 'react'

class DisplayDate extends React.Component {
  render () {
    let dDate = new Date(this.props.date)
    const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December' ]
    let output = monthNames[dDate.getMonth()] + ' ' + (dDate.getDate() + 1) + ', ' + dDate.getFullYear()

    return (
      <span>{output}</span>
    )
  }
}

DisplayDate.propTypes = {
  date: React.PropTypes.string.isRequired
}

export default DisplayDate
