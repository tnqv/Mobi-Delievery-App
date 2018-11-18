import { API_LOGIN_REQUEST, API_LOGIN_REQUEST_SUCCEEDED, API_LOGIN_REQUEST_FAILED, } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import NavigatorService from '../services/navigator';
import { Api } from './api';



function* loginFlow(action){

  try{
    let usernameFromAction = action.payload.username;
    let passwordFromAction = action.payload.password;

    const response = yield Api.loginFromApi(usernameFromAction,passwordFromAction);

    let token = response.account.token;
    console.log(response);

    if (token) {

      console.log("success: ", token);

      // This is a blocking call that would wait for the token to be stored,
      // or for the Promise to be resolved before proceeding to the next line
        yield put({ type: API_LOGIN_REQUEST_SUCCEEDED, result: response });

        yield put({ type: 'Navigate', na: NavigatorService.navigate('MenuScreen')});
    } else {
      // if (result.error) {
        yield put({ type: API_LOGIN_REQUEST_FAILED, error: "Sai tài khoản hoặc mật khẩu"  });
      // }
    }
  }catch(e){
      yield put({ type: API_LOGIN_REQUEST_FAILED, error: e });
      console.log("error", e);
  }

}
export function* watchLogin() {
  yield takeLatest(API_LOGIN_REQUEST, loginFlow);
}
