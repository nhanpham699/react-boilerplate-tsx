import { action } from 'typesafe-actions';
import ActionTypes from './constants';

interface Req {
  pageNum: number,
  pageSize: number,
  userIds: [number],
}

interface Res {
  total: number,
  currentPage: number,
  totalPage: number,
  rows: number,
  offset: number,
  list: []
}

interface ICustomer {
  name: string,
  cname: string,
  address: string,
  mobile: string,
  areaId: number,
  birthday: any,
  cityId: number,
  contactsId: number,
  industry: number,
  level: number,
  nextTime: any,
  provinceId:number,
  remark: string,
  gender: number,
  source:number,
  telephone: string,
  website: string,  
}

export const customerRequest = (req: Req) =>
  action(ActionTypes.CUSTOMER_REQUEST, req);

export const customerResponse = (res: Res) =>
  action(ActionTypes.CUSTOMER_RESPONSE, res);

export const customerFailed = () =>
  action(ActionTypes.CUSTOMER_FAILED);

export const addCustomer = (customer: ICustomer) =>
  action(ActionTypes.ADD_CUSTOMER, customer);


