// 访客资料查询
import request from '@/utils/request';

// 获取访客单详情
export function getVisitorDetail(id) {
  return request({
    url: `/visitor/getVisitorInfoById/${id}`,
    method: 'get'
  });
}

// 获取访客单详情-人员进出记录
export function getVisitorInOut(data) {
  return request({
    url: `/visitorDoor/getInfoByPage`,
    method: 'get',
    params: data
  });
}

// 获取访客单详情-车辆进出记录
export function getVisitorCarInOut(data) {
  return request({
    url: `/VisitorCar/getInfoByPage`,
    method: 'get',
    params: data
  });
}
