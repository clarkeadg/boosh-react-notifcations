import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

/* SCHEMAS */
import NotificationSchema from '../Schemas/NotificationSchema'

import { PaginationActions } from 'boosh-react-pagination'
import { UsersActions } from 'boosh-react-users'

export default (api) => {

  function * attemptGetNotifications (meta) {

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/notifications/";  

    // make the call to the api
    const response = yield call(api.getNotifications, query)

    console.log('GOT NOTIFICATIONS',response.data)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(NotificationSchema));
      if (!payload.result.length) {
        payload.entities.notifications = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;
      
      //console.log('NORMALIZED DATA', payload)

      //yield put(UsersActions.getUsersSuccess(payload))
      yield put(Actions.getNotificationsSuccess(payload))
      
    } else {
      yield put(Actions.getNotificationsFailure(response.data))
    }
  }

  function * watchGetNotificationsAttempt () {
    //yield takeEvery(Types.GET_FAVORITE_REQUEST, attemptGetFavorites)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_NOTIFICATIONS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetNotifications, meta)
    }
  }

  function * attemptUpdateNotifications (meta) {

    console.log('attemptUpdateNotifications', meta)

    let query = meta.meta; 

    // make the call to the api
    const response = yield call(api.updateNotifications, query.id, { read: query.read });

    console.log('UPDATE NOTIFICATIONS RESPONSE',response.data)

    // success?
    if (response && response.ok) {

      yield put(UsersActions.getUserStatusAttempt({
        id: query.user_id
      }));

      /*let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(NotificationSchema));
      if (!payload.result.length) {
        payload.entities.notifications = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;
      
      //console.log('NORMALIZED DATA', payload)

      //yield put(UsersActions.getUsersSuccess(payload))
      yield put(Actions.getNotificationsSuccess(payload))*/
      
    } else {
      //yield put(Actions.getNotificationsFailure(response.data))
    }
  }

  function * watchUpdateNotificationsAttempt () {
    yield takeEvery(Types.UPDATE_NOTIFICATIONS_REQUEST, attemptUpdateNotifications)
    // daemonize
    /*while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.UPDATE_NOTIFICATIONS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptUpdateNotifications, meta)
    }*/
  }

  return {
    watchGetNotificationsAttempt,
    attemptGetNotifications,

    watchUpdateNotificationsAttempt,
    attemptUpdateNotifications
  }
}
