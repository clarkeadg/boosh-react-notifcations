'use strict';

var NotificationsSelector = require('./Selectors/NotificationsSelector');
var NotificationsActions = require('./Actions/Creators');
var NotificationsCollection = require('./Collections/NotificationsCollection');
var NotificationsSaga = require('./Sagas/NotificationsSaga');
var NotificationsApi = require('./Services/NotificationsApi');
var NotificationsReducer = require('./Reducers/NotificationsReducer');
var NotificationsRoutes = require('./routes');

module.exports = {
  getVisibleNotifications: NotificationsSelector.getVisibleNotifications,
  NotificationsActions: NotificationsActions.default,
  NotificationsCollection: NotificationsCollection.default,
  NotificationsSaga: NotificationsSaga.default,
  NotificationsApi: NotificationsApi.default,
  NotificationsReducer: NotificationsReducer.default,
  NotificationsRoutes: NotificationsRoutes.default
};