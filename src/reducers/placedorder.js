import { API_UPDATE_ORDER_REQUEST,API_UPDATE_ORDER_REQUEST_SUCCEEDED,API_UPDATE_ORDER_REQUEST_FAILED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  isAuthenticated: false,
  updatedOrder  : {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.types) {
    case API_UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case API_UPDATE_ORDER_REQUEST_SUCCEEDED:
      console.log("yield success",state);
      console.log(action.result);
      return {
        ...state,
        loading: false,
        updatedOrder: action.result
      };
    case API_UPDATE_ORDER_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}