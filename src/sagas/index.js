import {fork,all} from 'redux-saga/effects';

import { watchLogin} from './login';
import { watchUpdateOrder } from './updateOrder';
import { watchFetchActiveOrders } from './fetchActiveOrders';
import { watchServiceReq } from './service';
import { watchFetchInStoreOrders } from './fetchInStoreOrders';



export default function* rootSaga() {
  yield all([
      fork(watchLogin),
      fork(watchUpdateOrder),
      fork(watchFetchActiveOrders),
      fork(watchServiceReq),
      fork(watchFetchInStoreOrders),
  ])
}
