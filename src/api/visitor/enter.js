// 访客资料录入
import request from '@/utils/request';

// 查询访客信息导入记录
export function getVisitorList(data) {
  return request({
    url: '/visitorInfo',
    method: 'get',
    params: data
  });
}

// 导入访客信息和照片
export function importVisitor(data) {
  return request({
    url: '/visitorInfo/importVisitorInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: data
  });
}

// 下载访客信息导入模板
export function downloadTemplate() {
  return '/visitorInfo/downTemplateByVisitor';
}

// 导入车辆进出记录
export function importCar(data) {
  return request({
    url: '/VisitorCar/importVisitorCar',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: data
  });
}

// 查询车辆进出记录
export function getCarList(data) {
  return request({
    url: '/VisitorCar',
    method: 'get',
    params: data
  });
}

// 下载车辆进出记录导入模板
export function downloadCarTemplate() {
  return '/VisitorCar/downVisitorCarTemplate';
}

// 导入人员进出记录
export function importUser(data) {
  return request({
    url: '/visitorDoor/importExcel',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: data
  });
}

// 查询人员进出记录
export function getUserList(data) {
  return request({
    url: '/visitorDoor',
    method: 'get',
    params: data
  });
}

// 下载人员进出记录导入模板
export function downloadUserTemplate() {
  return '/visitorDoor/downVisitorDoorTemplate';
}