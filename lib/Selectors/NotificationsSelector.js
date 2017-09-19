'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisibleNotifications = exports.getNotificationsCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allNotifications = function allNotifications(state, props) {
  return state.notifications;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'notifications';
};

/* Export */

var getNotificationsCollection = exports.getNotificationsCollection = (0, _reselect.createSelector)([allNotifications, path], function (notifications, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!notifications.collections[key]) return collection;
  collection.count = notifications.collections[key].count;
  collection.items = notifications.collections[key].result.map(function (id) {
    return notifications.entities[id];
  });
  return collection;
});

var getVisibleNotifications = exports.getVisibleNotifications = (0, _reselect.createSelector)([allNotifications], function (notifications) {
  return notifications.result.map(function (id) {
    return notifications.entities[id];
  });
});