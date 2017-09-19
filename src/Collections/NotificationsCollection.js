
/* React */
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getNotificationsCollection } from '../Selectors/NotificationsSelector'

/* Sagas */
//import GetUsersSaga from '../../Sagas/Preloaders/GetUsersSaga'

/* Components */
import { Row, Column, Button } from 'react-foundation'
import { Pagination, Portlet, Loading } from 'boosh-react-components'
//import Notification from '../Components/Notification/Notification'

let pageId = 1;

class NotificationsCollection extends React.Component {

  getData(pageNumber) {
    let { me } = this.props;
    if (!me.id) return false;

    let Meta = {
      query: {
        page: pageNumber,
        user_id: me.id
      },
      path: this.props.path || "/notifications/"
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
      <Row upOnSmall={1}>
        {notifications.items.map((item, id) => {
          return (
            <Column key={id}>
              { /* <Notification notif={item}/> */ }
            </Column>
          )
        })}
      </Row>
    )
  }

  render() {

    let { me, notifications, pageNumber, loading } = this.props;
    if (!me.id) return false;

    return (
      <div className="notifications">        
        { this.renderNotifications(loading, notifications) }        
        { /* this.renderMoreButton(count, notifications.count) */ }
      </div>             
    )
  }

}

// <Pagination pageNumber={pageNumber} path="/notifications/"/>

NotificationsCollection.propTypes = {
  me: React.PropTypes.object,
  loading: React.PropTypes.bool,
  notifications: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

NotificationsCollection.defaultProps = {
  me: {},
  loading: true,
  notifications: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.notifications.attempting,
    notifications: getNotificationsCollection(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetUsersSaga, {}]
  ];
}
Profile.preload = preload;*/

export default connect(mapStateToProps)(NotificationsCollection)

