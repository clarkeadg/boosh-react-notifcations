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

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _NotificationsSelector = require('../Selectors/NotificationsSelector');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Notification from '../Components/Notification/Notification'

/* Sagas */
//import GetUsersSaga from '../../Sagas/Preloaders/GetUsersSaga'

/* Components */


/* Actions */
var pageId = 1;

/* Selectors */

/* React */

var NotificationsCollection = function (_React$Component) {
  (0, _inherits3.default)(NotificationsCollection, _React$Component);

  function NotificationsCollection() {
    (0, _classCallCheck3.default)(this, NotificationsCollection);
    return (0, _possibleConstructorReturn3.default)(this, (NotificationsCollection.__proto__ || (0, _getPrototypeOf2.default)(NotificationsCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(NotificationsCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var me = this.props.me;

      if (!me.id) return false;

      var Meta = {
        query: {
          page: pageNumber,
          user_id: me.id
        },
        path: this.props.path || "/notifications/"
      };
      this.props.dispatch(_Creators2.default.getNotificationsAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pageNumber = this.props.pageNumber;

      this.getData(pageNumber);
      pageId++;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        this.getData(newProps.pageNumber);
      }
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      this.getData(pageId++);
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading(loading) {
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      return false;
    }
  }, {
    key: 'renderMoreButton',
    value: function renderMoreButton(count, len) {
      var _this2 = this;

      if (count > len) {
        return _react2.default.createElement(
          _reactFoundation.Button,
          { onClick: function onClick() {
              _this2.loadMore();
            } },
          'Load More'
        );
      }
      return false;
    }
  }, {
    key: 'renderNotifications',
    value: function renderNotifications(loading, notifications) {
      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 1 },
        notifications.items.map(function (item, id) {
          return _react2.default.createElement(_reactFoundation.Column, { key: id });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          me = _props.me,
          notifications = _props.notifications,
          pageNumber = _props.pageNumber,
          loading = _props.loading;

      if (!me.id) return false;

      return _react2.default.createElement(
        'div',
        { className: 'notifications' },
        this.renderNotifications(loading, notifications)
      );
    }
  }]);
  return NotificationsCollection;
}(_react2.default.Component);

// <Pagination pageNumber={pageNumber} path="/notifications/"/>

NotificationsCollection.propTypes = {
  me: _react2.default.PropTypes.object,
  loading: _react2.default.PropTypes.bool,
  notifications: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

NotificationsCollection.defaultProps = {
  me: {},
  loading: true,
  notifications: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.notifications.attempting,
    notifications: (0, _NotificationsSelector.getNotificationsCollection)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetUsersSaga, {}]
  ];
}
Profile.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(NotificationsCollection);