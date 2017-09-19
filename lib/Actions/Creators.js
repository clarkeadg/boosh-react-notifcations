'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* NOTIFICATIONS */
var getNotificationsAttempt = function getNotificationsAttempt(meta) {
  return { type: _Types2.default.GET_NOTIFICATIONS_REQUEST, meta: meta };
};
var getNotificationsSuccess = function getNotificationsSuccess(payload) {
  return { type: _Types2.default.GET_NOTIFICATIONS_SUCCESS, payload: payload };
};
var getNotificationsFailure = function getNotificationsFailure(errorCode) {
  return { type: _Types2.default.GET_NOTIFICATIONS_FAILURE, errorCode: errorCode };
};

var updateNotificationsAttempt = function updateNotificationsAttempt(meta) {
  return { type: _Types2.default.UPDATE_NOTIFICATIONS_REQUEST, meta: meta };
};
var updateNotificationsSuccess = function updateNotificationsSuccess(payload) {
  return { type: _Types2.default.UPDATE_NOTIFICATIONS_SUCCESS, payload: payload };
};
var updateNotificationsFailure = function updateNotificationsFailure(errorCode) {
  return { type: _Types2.default.UPDATE_NOTIFICATIONS_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getNotificationsAttempt: getNotificationsAttempt,
  getNotificationsSuccess: getNotificationsSuccess,
  getNotificationsFailure: getNotificationsFailure,

  updateNotificationsAttempt: updateNotificationsAttempt,
  updateNotificationsSuccess: updateNotificationsSuccess,
  updateNotificationsFailure: updateNotificationsFailure

};