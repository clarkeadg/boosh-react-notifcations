'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _NotificationsCollection = require('../Collections/NotificationsCollection');

var _NotificationsCollection2 = _interopRequireDefault(_NotificationsCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* React */
var Notifications = function (_React$Component) {
  (0, _inherits3.default)(Notifications, _React$Component);

  function Notifications() {
    (0, _classCallCheck3.default)(this, Notifications);
    return (0, _possibleConstructorReturn3.default)(this, (Notifications.__proto__ || (0, _getPrototypeOf2.default)(Notifications)).apply(this, arguments));
  }

  (0, _createClass3.default)(Notifications, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_NotificationsCollection2.default, { pageNumber: this.props.pageNumber });
    }
  }]);
  return Notifications;
}(_react2.default.Component);

/* Selectors */
//import { getPageNumber } from '../Selectors/PaginationSelector'

/* Collections */


Notifications.propTypes = {
  pageNumber: _react2.default.PropTypes.number
};

Notifications.defaultProps = {
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    //pageNumber: getPageNumber(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notifications);