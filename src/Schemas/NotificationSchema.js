import { Schema, valuesOf, arrayOf } from 'normalizr'

const NotificationSchema = new Schema('notifications', { idAttribute: 'id' });

const UserSchema = new Schema('users', { idAttribute: 'id' });

NotificationSchema.define({
  users: UserSchema
});

export default NotificationSchema;
