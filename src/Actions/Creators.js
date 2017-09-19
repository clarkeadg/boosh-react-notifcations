import Types from './Types'

/* NOTIFICATIONS */
const getNotificationsAttempt = (meta) => ({ type: Types.GET_NOTIFICATIONS_REQUEST, meta })
const getNotificationsSuccess = (payload) => ({ type: Types.GET_NOTIFICATIONS_SUCCESS, payload })
const getNotificationsFailure = (errorCode) => ({ type: Types.GET_NOTIFICATIONS_FAILURE, errorCode })

const updateNotificationsAttempt = (meta) => ({ type: Types.UPDATE_NOTIFICATIONS_REQUEST, meta })
const updateNotificationsSuccess = (payload) => ({ type: Types.UPDATE_NOTIFICATIONS_SUCCESS, payload })
const updateNotificationsFailure = (errorCode) => ({ type: Types.UPDATE_NOTIFICATIONS_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getNotificationsAttempt,
  getNotificationsSuccess,
  getNotificationsFailure,

  updateNotificationsAttempt,
  updateNotificationsSuccess,
  updateNotificationsFailure

}
