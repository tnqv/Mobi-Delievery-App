import { API_FETCH_ACTIVE_ORDERS_REQUEST,API_FETCH_ACTIVE_ORDERS_REQUEST_FAILED,API_FETCH_ACTIVE_ORDERS_REQUEST_SUCCEEDED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import NavigatorService from '../services/navigator';
import { Api } from './api';



function* fetchActiveOrdersFlow(action){

  try{
    let token = action.payload.token;
    let deliveryId = action.payload.deliveryId;;

    const response = yield Api.fetchActiveOrdersApi(token,deliveryId);

    if (response) {

      // This is a blocking call that would wait for the token to be stored,
      // or for the Promise to be resolved before proceeding to the next line
        yield put({ type: API_FETCH_ACTIVE_ORDERS_REQUEST_SUCCEEDED, result: response });
    } else {

        yield put({ type: API_FETCH_ACTIVE_ORDERS_REQUEST_FAILED, error: "Lỗi xảy ra" });

    }
  }catch(e){
      console.log(e);
      yield put({ type: API_FETCH_ACTIVE_ORDERS_REQUEST_FAILED, error: e });
  }

}
export function* watchFetchActiveOrders() {
  yield takeLatest(API_FETCH_ACTIVE_ORDERS_REQUEST, fetchActiveOrdersFlow);
}
