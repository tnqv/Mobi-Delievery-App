import * as types from './actionTypes';


export function serviceRequest(payload) {
  return {
    type: types.GET_SERVICES_API,
    payload: payload
  }
}

export function serviceRequestSucceeded(payload) {
  return {
    type: types.GET_SERVICES_API_SUCCEED,
    payload: payload
  }
}

export function serviceRequestFailed(payload) {
  return {
    type: types.GET_SERVICES_API_FAILED,
    payload: payload
  }
}