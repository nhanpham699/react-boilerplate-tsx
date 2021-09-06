 import { call, put, all, select, takeEvery } from 'redux-saga/effects';
 import ActionTypes from './constants';
 import { reposLoaded, repoLoadingError } from 'containers/App/actions';
 import { customerFailed, customerResponse } from './actions';
 import axios from 'axios';
 import { makeSelectCustomer } from './selectors';

 const url = "https://ucode-crm-web-2nbynb4kyq-as.a.run.app/api-crm"
 const tokenStr:any = localStorage.getItem('token');  
 const convertUserId = (req) => {
  let userIds = "";
  for(let userId of req){
    userIds += "&userId=" + userId
  }
  return userIds
 } 
 
 const CustomerInstance = axios.create({
  baseURL: url,
  headers: {
    Authorization: 'Bearer ' + JSON.parse(tokenStr).value,
    'Content-Type': 'application/json',
  },
});

 const CustomerGet = (req) =>
  CustomerInstance.request({ 
    method: 'GET', 
    url: `/crm-customer/list?pageNum=${req.pageNum}&pageSize=${req.pageSize + convertUserId(req.userIds)}`, 
  })

  export const CustomerCreate = (req) => 
    CustomerInstance.request({ 
      method: 'POST', 
      url: `${url}/crm-customer/create`,
      data: req, 
    });
     
  

  


  function* CustomerRequest(action) {
    try {
      const customer = yield select(makeSelectCustomer());
      const res = yield call(CustomerGet, action.payload);
      const { data } = res.data;
      const listData = data.list.map(dt => {
        return {
          ...dt,
          birthday: dt.birthday ? (new Date(dt.birthday)).toLocaleString('en-US') : "",
          createdTime: dt.createdTime ? (new Date(dt.createdTime)).toLocaleString('en-US') : "",
          lastTime: dt.lastTime ? (new Date(dt.lastTime)).toLocaleString('en-US') : "",
          nextTime: dt.nextTime ? (new Date(dt.nextTime)).toLocaleString('en-US') : "",
          updatedTime: dt.updatedTime ? (new Date(dt.updatedTime)).toLocaleString('en-US') : "",
        }
      });
      data.list = listData      
      yield put(customerResponse(data));
      yield put(reposLoaded(res, customer));
    } catch (err) {
      yield put(customerFailed());
    }
  }

  function* CustomerWatcher() {
    yield takeEvery(ActionTypes.CUSTOMER_REQUEST, CustomerRequest);
  }
  
  function* CustomerSaga() {
    yield all([CustomerWatcher()]);
  }

  export { CustomerSaga };