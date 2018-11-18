import * as types from './actionTypes';


export function fetchActiveOrdersRequest(payload) {
  return {
    type: types.API_FETCH_ACTIVE_ORDERS_REQUEST,
    payload: payload
  }
}

export function fetchActiveOrdersRequestSucceeded(payload) {
  return {
    type: types.API_FETCH_ACTIVE_ORDERS_REQUEST_SUCCEEDED,
    payload: payload
  }
}

export function fetchActiveOrdersRequestFailed(payload) {
  return {
    type: types.API_FETCH_ACTIVE_ORDERS_REQUEST_FAILED,
    payload: payload
  }
}