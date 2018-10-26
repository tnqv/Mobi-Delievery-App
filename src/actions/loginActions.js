import * as types from './actionTypes';


export function loginRequest(payload) {
  return {
    type: types.API_LOGIN_REQUEST,
    payload: payload
  }
}

export function loginRequestSucceeded(payload) {
  return {
    type: types.API_LOGIN_REQUEST_SUCCEEDED,
    payload: payload
  }
}

export function loginRequestFailed(payload) {
  return {
    type: types.API_LOGIN_REQUEST_FAILED,
    payload: payload
  }
}