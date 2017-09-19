
const NotificationsSelector  = require('./Selectors/NotificationsSelector');
const NotificationsActions   = require('./Actions/Creators');
const NotificationsCollection  = require('./Collections/NotificationsCollection');
const NotificationsSaga      = require('./Sagas/NotificationsSaga');
const NotificationsApi       = require('./Services/NotificationsApi');
const NotificationsReducer   = require('./Reducers/NotificationsReducer');
const NotificationsRoutes    = require('./routes');

module.exports = {
  getVisibleNotifications:   NotificationsSelector.getVisibleNotifications,
  NotificationsActions:      NotificationsActions.default,
  NotificationsCollection:   NotificationsCollection.default,
  NotificationsSaga:         NotificationsSaga.default,
  NotificationsApi:          NotificationsApi.default,
  NotificationsReducer:      NotificationsReducer.default,
  NotificationsRoutes:       NotificationsRoutes.default
}
