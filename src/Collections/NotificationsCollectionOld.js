
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getVisibleNotifications } from '../Selectors/NotificationsSelector'
import { getPageNumber, getPageCount } from 'boosh-react-pagination'

/* Sagas */
//import GetUsersSaga from '../../Sagas/Preloaders/GetUsersSaga'

/* Components */
import { Row, Column, Button } from 'react-foundation'
import { Portlet, Loading } from 'boosh-react-components'
import { Pagination } from 'boosh-react-pagination'
import Notification from '../Components/Notification/Notification'

let pageId = 1;

class NotificationsCollection extends React.Component {

  getData(pageNumber) {
    let Meta = {
      page: pageNumber
    }
    this.props.dispatch(Actions.getNotificationsAttempt(Meta));
  }

  componentDidMount() {
    let { pageNumber } = this.props
    this.getData(pageNumber)
    pageId++;
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber) {
      this.getData(newProps.pageNumber)
    }
  }

  loadMore() {
    this.getData(pageId++)
  }

  renderLoading(loading) {
    if (loading) {
      return (<Loading/>)
    }
    return false;
  }

  renderMoreButton(count, len) {
    if(count > len) {
      return (<Button onClick={()=>{this.loadMore()}}>Load More</Button>)
    }
    return false;
  }

  renderNotifications(loading, notifications) {
    return (
      <div>
        {notifications.map((item, id) => {
          return (
            <Column key={id}>
              <Notification notif={item}/>
            </Column>
          )
        })}
        { this.renderLoading(loading) }
      </div>
    )
  }

  render() {

    let { notifications, pageNumber, loading, count } = this.props;

    return (
      <Row className="display">
        <Column small={12}>
          <Portlet title={'Notifications'} items={
            <div className="notifactions">
              <Row upOnSmall={1}>
                { this.renderNotifications(loading, notifications) }
              </Row>
              { this.renderMoreButton(count, notifications.length) }
            </div>
          } />
        </Column>
      </Row>
    )
  }

}

// <Pagination pageNumber={pageNumber} path="/notifications/"/>

NotificationsCollection.propTypes = {
  loading: React.PropTypes.bool,
  notifications: React.PropTypes.array,
  pageNumber: React.PropTypes.number,
  count: React.PropTypes.number
}

NotificationsCollection.defaultProps = {
  loading: true,
  notifications: [],
  pageNumber: 1,
  count: 0
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.notifications.attempting,
    notifications: getVisibleNotifications(state, props),
    count: getPageCount(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetUsersSaga, {}]
  ];
}
Profile.preload = preload;*/

export default connect(mapStateToProps)(NotificationsCollection)

