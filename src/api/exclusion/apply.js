// 申请列管
import request from '@/utils/request';

// 申请/取消列管
export function applyExclusion(data) {
  return request({
    url: '/ApplicationApprove',
    method: 'post',
    data
  });
}

// 提交验证
export function applyCheck(data) {
  return request({
    url: '/ApplicationApprove/checkApply',
    method: 'post',
    data
  });
}

// 中央人资验证
export function applyCheckCentral(data) {
  return request({
    url: '/ApplicationApprove/checkApplyData',
    method: 'post',
    data
  });
}

// 校验人员是否被列管
export function checkUser(data) {
  return request({
    url: '/ControlPeople/checkControlPersons',
    method: 'get',
    params: data
  });
}
