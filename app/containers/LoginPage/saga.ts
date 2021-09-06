 import { call, put, all, takeEvery } from 'redux-saga/effects';
 import ActionTypes from './constants';
 import { userLogInFailed, userLogInSuccess } from './actions';
 import axios from 'axios';
 import jwtDecode from 'jwt-decode';


 
 const UserInstance = axios.create({
  baseURL: "https://ucode-crm-web-2nbynb4kyq-as.a.run.app/api-crm",
});

 const LogInPost = (user) =>
  UserInstance.request({ 
    method: 'POST', 
    url: `/pswLogin?password=${user.password}&username=${user.username}`, 
  });

  function* LoginRequest(action) {
    try {
      const user = yield call(LogInPost, action.payload);
      const { data } = user.data;
      const jwtToken: any = jwtDecode(data.token as string);
			const expiry = new Date(jwtToken?.exp * 1000);

      const token = {
        value: data.token,
        expiry: expiry.getTime(),
      }
      const userId = {
        value: data.id,
        expiry: expiry.getTime(),
      }
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userId', JSON.stringify(userId));
      yield put(userLogInSuccess(data));
      window.location.href = "/";
    } catch (error) {
      yield put(userLogInFailed());
    }
  }

  function* userWatcher() {
    yield takeEvery(ActionTypes.LOGIN_REQUEST, LoginRequest);
  }
  
  function* LogInSaga() {
    yield all([userWatcher()]);
  }

  export { LogInSaga };