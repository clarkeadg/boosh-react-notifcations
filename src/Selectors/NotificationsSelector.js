import { createSelector } from 'reselect'

/* Private */

const allNotifications = (state, props) => state.notifications

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'notifications'

/* Export */

export const getNotificationsCollection = createSelector(
  [ allNotifications, path ],
  ( notifications, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!notifications.collections[key]) return collection;
    collection.count = notifications.collections[key].count;
    collection.items = notifications.collections[key].result.map((id) => {
      return notifications.entities[id]
    })
    return collection;
  }
)

export const getVisibleNotifications = createSelector(
  [ allNotifications ],
  ( notifications ) => {
    return notifications.result.map((id) => {
      return notifications.entities[id]
    })
  }
)
