'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Notifications = require('./Containers/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '' },
    _react2.default.createElement(_reactRouter.Route, { path: 'notifications', omponent: _Notifications2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'notifications/:pageNumber', omponent: _Notifications2.default })
  );
  return routes;
};