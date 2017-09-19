
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Components */
import { GetUser } from 'boosh-react-users'
import { getMe } from 'boosh-react-auth'
import { Row, Column } from 'react-foundation';
import NotificationActions from '../../Actions/Creators'

class Notification extends React.Component {

  addViewed() {
    let { notif, time, me } = this.props;
    if (!notif.id || !time || !me.id) return false;
    if (notif.read) return false;
    console.log('ADD VIEWED', notif.id, time)
    this.props.dispatch(NotificationActions.updateNotificationsAttempt({
      user_id: me.id,
      id: notif.id,
      read: time
    }))    
  }

  componentDidMount() {
    this.addViewed();
  }

  componentWillReceiveProps (newProps) {
    this.addViewed();
  }

  render() {

    let { notif } = this.props;
    if (!notif) {
      return false;
    }    

    console.log('NOTIF', notif)

    switch(notif.item_type) {
      case 'new_follower':
        return (
          <div className={'notification notification-new_follower'} >
            <Row>
              <Column small={2}>
                <GetUser user_id={notif.item_id} userOptions={{ width: 110, height: 110 }} />
              </Column>
              <Column small={10}>
                <span className="copy">is following you.</span>
              </Column>
            </Row>
          </div>
        )
      break;
      case 'favorited_you':
        return (
          <div className={'notification notification-favorited_you'} >
            <Row>
              <Column small={2}>
                <GetUser user_id={notif.item_id} userOptions={{ width: 110, height: 110 }} />
              </Column>
              <Column small={10}>
                <span className="copy">added you as a favorite.</span>
              </Column>
            </Row>
          </div>
        )
      break;
      case 'wants_to_meet_you':
        return (
          <div className={'notification notification-wants_to_meet_you'} >
            <Row>
              <Column small={2}>
                <GetUser user_id={notif.item_id} userOptions={{ width: 110, height: 110 }} />
              </Column>
              <Column small={10}>
                <span className="copy">wants to meet you.</span>
              </Column>
            </Row>
          </div>
        )
      break;       
        return false;
      break;
    }

  }

}

Notification.propTypes = {
  me: React.PropTypes.object,
  time: React.PropTypes.string
}

Notification.defaultProps = {
  me: {},
  time: null
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    time: state.status.time || null
  }
}

export default connect(mapStateToProps)(Notification)
