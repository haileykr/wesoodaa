import { all, fork, put, delay, call, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../reducers/user";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

// test code
/* const l = logIn({type: 'LOG_IN_REQUEST', data: {id: 'BP'}})
l.next();
l.next();*/

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    //yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function logOutAPI() {
  return axios.post("/logout");
}

function* logOut() {
  try {
    //const result = yield call(logOutAPI)
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function followAPI() {
  return axios.post("/follow");
}

function* follow(action) {
  try {
    //const result = yield call(followAPI)
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function unfollowAPI() {
  return axios.post("/unfollow");
}
function* unfollow(action) {
  try {
    //const result = yield call(unfollowAPI)
    yield delay(1000);

    yield put({
      type: UNFOLLOW_SUCCESS,

      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
