import React from 'react'
import { connect } from 'react-redux'

import LineChart from './render/LineChart'

// main component for Compare page
class Compare extends React.Component {
  render () {
    return (
      <div>
        <div className='row centered'>
          <div className='col-md-8 col-md-offset-2'>
            <h1>Compare</h1>
            <h5>See how your stocks are doing agaisnt each other!</h5>
            <LineChart />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

Compare.propTypes = {
  data: React.PropTypes.array
}

export default connect(mapStateToProps)(Compare)
