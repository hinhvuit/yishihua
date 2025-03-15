// 访客资料查询
import request from '@/utils/request';

// 获取访客信息列表
export function getInfoList(data) {
  return request({
    url: '/visitor/getVisitorInfoList',
    method: 'get',
    params: data
  });
}

// 获取人员进出列表
export function getUserList(data) {
  return request({
    url: '/visitor/getVisitorDoorList',
    method: 'get',
    params: data
  });
}

// 获取车辆进出记录列表
export function getCarList(data) {
  return request({
    url: '/visitor/getVisitorCarList',
    method: 'get',
    params: data
  });
}
