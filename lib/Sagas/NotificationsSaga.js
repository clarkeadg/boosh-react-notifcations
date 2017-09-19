'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _NotificationSchema = require('../Schemas/NotificationSchema');

var _NotificationSchema2 = _interopRequireDefault(_NotificationSchema);

var _booshReactPagination = require('boosh-react-pagination');

var _booshReactUsers = require('boosh-react-users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  var _marked = [attemptGetNotifications, watchGetNotificationsAttempt, attemptUpdateNotifications, watchUpdateNotificationsAttempt].map(_regenerator2.default.mark);

  function attemptGetNotifications(meta) {
    var query, path, response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetNotifications$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/notifications/";

            // make the call to the api

            _context.next = 4;
            return (0, _effects.call)(api.getNotifications, query);

          case 4:
            response = _context.sent;


            console.log('GOT NOTIFICATIONS', response.data);

            // success?

            if (!(response && response.ok)) {
              _context.next = 18;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_NotificationSchema2.default));

            if (!payload.result.length) {
              payload.entities.notifications = {};
            }
            payload.query = query;
            payload.path = path;
            payload.count = count;

            //console.log('NORMALIZED DATA', payload)

            //yield put(UsersActions.getUsersSuccess(payload))
            _context.next = 16;
            return (0, _effects.put)(_Creators2.default.getNotificationsSuccess(payload));

          case 16:
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return (0, _effects.put)(_Creators2.default.getNotificationsFailure(response.data));

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function watchGetNotificationsAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchGetNotificationsAttempt$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!true) {
              _context2.next = 9;
              break;
            }

            _context2.next = 3;
            return (0, _effects.take)(_Types2.default.GET_NOTIFICATIONS_REQUEST);

          case 3:
            _ref = _context2.sent;
            meta = _ref.meta;
            _context2.next = 7;
            return (0, _effects.call)(attemptGetNotifications, meta);

          case 7:
            _context2.next = 0;
            break;

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function attemptUpdateNotifications(meta) {
    var query, response;
    return _regenerator2.default.wrap(function attemptUpdateNotifications$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:

            console.log('attemptUpdateNotifications', meta);

            query = meta.meta;

            // make the call to the api

            _context3.next = 4;
            return (0, _effects.call)(api.updateNotifications, query.id, { read: query.read });

          case 4:
            response = _context3.sent;


            console.log('UPDATE NOTIFICATIONS RESPONSE', response.data);

            // success?

            if (!(response && response.ok)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 9;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getUserStatusAttempt({
              id: query.user_id
            }));

          case 9:
            _context3.next = 11;
            break;

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function watchUpdateNotificationsAttempt() {
    return _regenerator2.default.wrap(function watchUpdateNotificationsAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.UPDATE_NOTIFICATIONS_REQUEST, attemptUpdateNotifications);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  return {
    watchGetNotificationsAttempt: watchGetNotificationsAttempt,
    attemptGetNotifications: attemptGetNotifications,

    watchUpdateNotificationsAttempt: watchUpdateNotificationsAttempt,
    attemptUpdateNotifications: attemptUpdateNotifications
  };
};

/* SCHEMAS */