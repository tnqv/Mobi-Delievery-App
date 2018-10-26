
const baseUrl = 'http://ec2-54-169-35-216.ap-southeast-1.compute.amazonaws.com:8080/api/v1';

import axios from 'axios';

function* loginFromApi(usernameFromAction,passwordFromAction){
  console.log("call in api");
  const response = yield axios({
    method: 'post',
    url: baseUrl + '/account/login',
    header: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      'username': usernameFromAction,
      'password': passwordFromAction,
    }
  });

  const accountInfo = yield response.status === 200 ? JSON.parse(response._bodyInit): []
  console.log(response);
  return accountInfo;
}

export const Api = {
  loginFromApi,
};