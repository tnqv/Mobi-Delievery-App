import { GET_SERVICES_API,GET_SERVICES_API_FAILED,GET_SERVICES_API_SUCCEED } from '../actions/actionTypes';



const initialState = {
  loading: false,
  data : {},
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES_API:
      console.log(state);
      return {
        ...state,
      }
    case GET_SERVICES_API_SUCCEED:
      return {
        ...state,
        data: action.data
      }
    case GET_SERVICES_API_FAILED:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
}