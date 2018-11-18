import * as types from './actionTypes';


export function updateOrderRequest(payload) {
  return {
    type: types.API_UPDATE_ORDER_REQUEST,
    payload: payload
  }
}

export function updateOrderRequestSucceeded(payload) {
  return {
    type: types.API_UPDATE_ORDER_REQUEST_SUCCEEDED,
    payload: payload
  }
}

export function updateOrderRequestFailed(payload) {
  return {
    type: types.API_UPDATE_ORDER_REQUEST_FAILED,
    payload: payload
  }
}