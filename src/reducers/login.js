import { API_LOGIN_REQUEST,API_LOGIN_REQUEST_FAILED,API_LOGIN_REQUEST_SUCCEEDED, FACEBOOK_LOGIN, FACEBOOK_LOGIN_SUCCEED, FACEBOOK_LOGIN_FAILED,LOAD_TOKEN_FROM_STORAGE,LOAD_TOKEN_FROM_STORAGE_SUCCEEDED,LOAD_TOKEN_FROM_STORAGE_FAILED } from '../actions/actionTypes';



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
      }
    case API_LOGIN_REQUEST_SUCCEEDED:
      console.log("yield success",state);
      console.log(action.results.info);
      return {
        ...state,
        loading: false,
        results: action.results,
        token: action.results.info.account.token,
        user: action.results.info.user,
      };
    case API_LOGIN_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}