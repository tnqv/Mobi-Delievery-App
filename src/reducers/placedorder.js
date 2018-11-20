import { API_UPDATE_ORDER_REQUEST,API_UPDATE_ORDER_REQUEST_SUCCEEDED,API_UPDATE_ORDER_REQUEST_FAILED,REMOVE_ERROR_SUCCESS } from '../actions/actionTypes';



const initialState = {
  loading: false,
  isAuthenticated: false,
  updatedOrder  : {},
  error: null,
  success: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case API_UPDATE_ORDER_REQUEST_SUCCEEDED:
      console.log("success");
      return {
        ...state,
        loading: false,
        updatedOrder: action.result,
        success: true,
      };
    case API_UPDATE_ORDER_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_ERROR_SUCCESS:
      return {
        error: null,
        success: null,
      } ;
    default:
      return state;
  }
}