import { API_UPDATE_ORDER_REQUEST,API_UPDATE_ORDER_REQUEST_SUCCEEDED,API_UPDATE_ORDER_REQUEST_FAILED } from '../actions/actionTypes';
//Saga effects
import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import NavigatorService from '../services/navigator';
import { Api } from './api';



function* updateOrderFlow(action){

  try{
    let token = action.payload.token;
    let userId = action.payload.userId;
    let statusId = action.payload.statusId;
    let orderId = action.payload.orderId;

    let servicesOrder;
    let response;
    if(statusId === 4){
      servicesOrder = action.payload.servicesOrder;
      response = yield Api.updateStatusApi(token,userId,orderId,statusId,servicesOrder);
    }else{
      response = yield Api.updateStatusApi(token,userId,orderId,statusId);
    }

    if (response) {
      // This is a blocking call that would wait for the token to be stored,
      // or for the Promise to be resolved before proceeding to the next line
        yield put({ type: API_UPDATE_ORDER_REQUEST_SUCCEEDED, result: response });
    } else {

        yield put({ type: API_UPDATE_ORDER_REQUEST_FAILED, error: "Lỗi xảy ra" });

    }
  }catch(e){
      console.log(e);
      yield put({ type: API_UPDATE_ORDER_REQUEST_FAILED, error: e });
  }

}
export function* watchUpdateOrder() {
  yield takeLatest(API_UPDATE_ORDER_REQUEST, updateOrderFlow);
}
