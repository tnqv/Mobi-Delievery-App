import { API_LOGIN_REQUEST,API_LOGIN_REQUEST_FAILED,API_LOGIN_REQUEST_SUCCEEDED,REMOVE_ERROR } from '../actions/actionTypes';

const initialState = {
  loading: false,
  username: '',
  password: '',
  token: '',
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case API_LOGIN_REQUEST_SUCCEEDED:
      return {
        ...state,
        error: null,
        loading: false,
        results: action.result,
        token: action.result.account.token,
        user: action.result.user,
      };
    case API_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}