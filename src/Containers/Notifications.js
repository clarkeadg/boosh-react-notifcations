
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Selectors */
//import { getPageNumber } from '../Selectors/PaginationSelector'

/* Collections */
import NotificationsCollection from '../Collections/NotificationsCollection'

class Notifications extends React.Component {

  render() {
    return (<NotificationsCollection pageNumber={this.props.pageNumber}/>)
  }

}

Notifications.propTypes = {
  pageNumber: React.PropTypes.number
}

Notifications.defaultProps = {
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    //pageNumber: getPageNumber(state, props)
  }
}

export default connect(mapStateToProps)(Notifications)

