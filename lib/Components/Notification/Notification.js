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

var _booshReactUsers = require('boosh-react-users');

var _booshReactAuth = require('boosh-react-auth');

var _reactFoundation = require('react-foundation');

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */

/* React */
var Notification = function (_React$Component) {
  (0, _inherits3.default)(Notification, _React$Component);

  function Notification() {
    (0, _classCallCheck3.default)(this, Notification);
    return (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).apply(this, arguments));
  }

  (0, _createClass3.default)(Notification, [{
    key: 'addViewed',
    value: function addViewed() {
      var _props = this.props,
          notif = _props.notif,
          time = _props.time,
          me = _props.me;

      if (!notif.id || !time || !me.id) return false;
      if (notif.read) return false;
      console.log('ADD VIEWED', notif.id, time);
      this.props.dispatch(_Creators2.default.updateNotificationsAttempt({
        user_id: me.id,
        id: notif.id,
        read: time
      }));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addViewed();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.addViewed();
    }
  }, {
    key: 'render',
    value: function render() {
      var notif = this.props.notif;

      if (!notif) {
        return false;
      }

      console.log('NOTIF', notif);

      switch (notif.item_type) {
        case 'new_follower':
          return _react2.default.createElement(
            'div',
            { className: 'notification notification-new_follower' },
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 2 },
                _react2.default.createElement(_booshReactUsers.GetUser, { user_id: notif.item_id, userOptions: { width: 110, height: 110 } })
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 10 },
                _react2.default.createElement(
                  'span',
                  { className: 'copy' },
                  'is following you.'
                )
              )
            )
          );
          break;
        case 'favorited_you':
          return _react2.default.createElement(
            'div',
            { className: 'notification notification-favorited_you' },
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 2 },
                _react2.default.createElement(_booshReactUsers.GetUser, { user_id: notif.item_id, userOptions: { width: 110, height: 110 } })
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 10 },
                _react2.default.createElement(
                  'span',
                  { className: 'copy' },
                  'added you as a favorite.'
                )
              )
            )
          );
          break;
        case 'wants_to_meet_you':
          return _react2.default.createElement(
            'div',
            { className: 'notification notification-wants_to_meet_you' },
            _react2.default.createElement(
              _reactFoundation.Row,
              null,
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 2 },
                _react2.default.createElement(_booshReactUsers.GetUser, { user_id: notif.item_id, userOptions: { width: 110, height: 110 } })
              ),
              _react2.default.createElement(
                _reactFoundation.Column,
                { small: 10 },
                _react2.default.createElement(
                  'span',
                  { className: 'copy' },
                  'wants to meet you.'
                )
              )
            )
          );
          break;
          return false;
          break;
      }
    }
  }]);
  return Notification;
}(_react2.default.Component);

Notification.propTypes = {
  me: _react2.default.PropTypes.object,
  time: _react2.default.PropTypes.string
};

Notification.defaultProps = {
  me: {},
  time: null
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    time: state.status.time || null
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notification);