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

var _booshReactPagination = require('boosh-react-pagination');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _Notification = require('../Components/Notification/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Sagas */
//import GetUsersSaga from '../../Sagas/Preloaders/GetUsersSaga'

/* Components */


/* Selectors */

/* React */
var pageId = 1;

/* Actions */

var NotificationsCollection = function (_React$Component) {
  (0, _inherits3.default)(NotificationsCollection, _React$Component);

  function NotificationsCollection() {
    (0, _classCallCheck3.default)(this, NotificationsCollection);
    return (0, _possibleConstructorReturn3.default)(this, (NotificationsCollection.__proto__ || (0, _getPrototypeOf2.default)(NotificationsCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(NotificationsCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var Meta = {
        page: pageNumber
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
        'div',
        null,
        notifications.map(function (item, id) {
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _react2.default.createElement(_Notification2.default, { notif: item })
          );
        }),
        this.renderLoading(loading)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          notifications = _props.notifications,
          pageNumber = _props.pageNumber,
          loading = _props.loading,
          count = _props.count;


      return _react2.default.createElement(
        _reactFoundation.Row,
        { className: 'display' },
        _react2.default.createElement(
          _reactFoundation.Column,
          { small: 12 },
          _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Notifications', items: _react2.default.createElement(
              'div',
              { className: 'notifactions' },
              _react2.default.createElement(
                _reactFoundation.Row,
                { upOnSmall: 1 },
                this.renderNotifications(loading, notifications)
              ),
              this.renderMoreButton(count, notifications.length)
            ) })
        )
      );
    }
  }]);
  return NotificationsCollection;
}(_react2.default.Component);

// <Pagination pageNumber={pageNumber} path="/notifications/"/>

NotificationsCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  notifications: _react2.default.PropTypes.array,
  pageNumber: _react2.default.PropTypes.number,
  count: _react2.default.PropTypes.number
};

NotificationsCollection.defaultProps = {
  loading: true,
  notifications: [],
  pageNumber: 1,
  count: 0
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.notifications.attempting,
    notifications: (0, _NotificationsSelector.getVisibleNotifications)(state, props),
    count: (0, _booshReactPagination.getPageCount)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetUsersSaga, {}]
  ];
}
Profile.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(NotificationsCollection);