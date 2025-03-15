import request from '@/utils/request';

// 根据单号获取申请单
export function getApplicationForm(number) {
  return request({
    url: '/ApplicationForm/' + number,
    method: 'get'
  });
}

// 获取管控类型
export function getControlType() {
  return request({
    url: '/controlType',
    method: 'get'
  });
}
