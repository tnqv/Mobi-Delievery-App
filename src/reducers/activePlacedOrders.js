import { API_FETCH_ACTIVE_ORDERS_REQUEST,API_FETCH_ACTIVE_ORDERS_REQUEST_FAILED,API_FETCH_ACTIVE_ORDERS_REQUEST_SUCCEEDED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  isAuthenticated: false,
  activeOrders  : [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_FETCH_ACTIVE_ORDERS_REQUEST:
      console.log("fetching");
      console.log(state);
      return {
        ...state,
        loading: true,
      }
    case API_FETCH_ACTIVE_ORDERS_REQUEST_SUCCEEDED:
      console.log("new state");
      console.log(state);
      return {
        ...state,
        loading: false,
        activeOrders: action.result
      };
    case API_FETCH_ACTIVE_ORDERS_REQUEST_FAILED:
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