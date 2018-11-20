
const baseUrl = 'http://ec2-54-169-35-216.ap-southeast-1.compute.amazonaws.com:8080/api/v1';

import axios from 'axios';

function* loginFromApi(usernameFromAction,passwordFromAction){
  console.log("call in api");
  let formData = new FormData();

  formData.append('username', usernameFromAction);
  formData.append('password', passwordFromAction);

  const response = yield axios({
    method: 'post',
    url: baseUrl + '/account/driver/login',
    header: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formData,
  });
  const accountInfo = yield response.status === 200 ? response.data : null
  return accountInfo;
}


function* updateStatusApi(token,userId,orderId,statusId,serviceOrders){
  let formData = new FormData();
  let dataParam = statusId !== 4 ? { 'user_id': userId } : { 'user_id': userId,'service_orders': JSON.stringify(serviceOrders)};
  for ( let key in dataParam ) {
    formData.append(key, dataParam[key]);
  }
  const response = yield axios({
    method: 'PUT',
    url: baseUrl + `/placedorder/${orderId}/status/${statusId}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": token,
    },
    data: formData,
  });


  const orderUpdated = yield response.status === 200 ? response : null;

  return orderUpdated;
}

function* fetchActiveOrdersApi(token,deliveryId){
  const response = yield axios({
    method: 'GET',
    url: baseUrl + `/user/${deliveryId}/delivery/active`,
    headers: {
        "Authorization": token,
    }
  });
  const activeOrders = yield response.status === 200 ? response.data.records : null;

  return activeOrders;
}

function* fetchInStoreOrdersApi(token,deliveryId){
  const response = yield axios({
    method: 'GET',
    url: baseUrl + `/user/${deliveryId}/delivery/instore`,
    headers: {
        "Authorization": token,
    }
  });
  const inStoreOrders = yield response.status === 200 ? response.data.records : null;

  return inStoreOrders;
}



function* getServicesFromApi(){
  const response = yield axios(baseUrl + '/category');

  const services = yield response.status === 200 ? response.data.records : [];
  return services;
}


export const Api = {
  loginFromApi,
  updateStatusApi,
  fetchActiveOrdersApi,
  getServicesFromApi,
  fetchInStoreOrdersApi,
};