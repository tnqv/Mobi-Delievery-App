import { API_FETCH_IN_STORE_ORDERS_REQUEST,API_FETCH_IN_STORE_ORDERS_REQUEST_SUCCEEDED,API_FETCH_IN_STORE_ORDERS_REQUEST_FAILED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  isAuthenticated: false,
  inStoreOrders  : [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_FETCH_IN_STORE_ORDERS_REQUEST:
      console.log("fetching");
      console.log(state);
      return {
        ...state,
        loading: true,
      }
    case API_FETCH_IN_STORE_ORDERS_REQUEST_SUCCEEDED:
      console.log("new state");
      console.log(state);
      return {
        ...state,
        loading: false,
        activeOrders: action.result
      };
    case API_FETCH_IN_STORE_ORDERS_REQUEST_FAILED:
      console.log("new error");
      console.log(state);
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}