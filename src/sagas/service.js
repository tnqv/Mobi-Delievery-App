import { GET_SERVICES_API,GET_SERVICES_API_SUCCEED,GET_SERVICES_API_FAILED } from '../actions/actionTypes';
import { NavigationActions } from 'react-navigation';
//Saga effects
import { put, takeLatest,takeEvery,call } from 'redux-saga/effects';
import { Api } from './api';
import NavigatorService from '../services/navigator';
import deviceStorage from '../services/deviceStorage';



function* fetchServices(){
    console.log("fetching");
    try {
        const receivedServices = yield Api.getServicesFromApi();
        yield put({ type: GET_SERVICES_API_SUCCEED, data: receivedServices });
        console.log("fetch success");
        yield put({ type: 'Navigate', na: NavigatorService.navigate('MainTabBar')});
    }catch(e){
        yield put({ type: GET_SERVICES_API_FAILED, error: e });
        console.log("fetch faile");
        yield put({ type: 'Navigate', na: NavigatorService.navigate('MainTabBar')});
    }
}

export function* watchServiceReq() {
  yield takeLatest(GET_SERVICES_API, fetchServices);
}