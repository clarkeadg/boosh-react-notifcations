'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var NotificationSchema = new _normalizr.Schema('notifications', { idAttribute: 'id' });

var UserSchema = new _normalizr.Schema('users', { idAttribute: 'id' });

NotificationSchema.define({
  users: UserSchema
});

exports.default = NotificationSchema;