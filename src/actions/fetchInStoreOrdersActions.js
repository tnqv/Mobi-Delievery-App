import * as types from './actionTypes';


export function fetchInStoreOrdersRequest(payload) {
  return {
    type: types.API_FETCH_IN_STORE_ORDERS_REQUEST,
    payload: payload
  }
}

export function fetchInStoreOrdersRequestSucceeded(payload) {
  return {
    type: types.API_FETCH_IN_STORE_ORDERS_REQUEST_SUCCEEDED,
    payload: payload
  }
}

export function fetchInStoreOrdersRequestFailed(payload) {
  return {
    type: types.API_FETCH_IN_STORE_ORDERS_REQUEST_FAILED,
    payload: payload
  }
}