import request from '@/utils/request';

// 签核
export function patrolSign(data) {
  return request({
    url: '/patrolApprove/signForm',
    method: 'post',
    data
  });
}

// 签核列表
export function patrolSignList(data) {
  return request({
    url: '/patrolApprove/getBackApproveForPC',
    method: 'get',
    params: data
  });
}

// 签核详情
export function patrolSignDetail(data) {
  return request({
    url: '/patrolApprove/getInfoByNumberAndType',
    method: 'get',
    params: data
  });
}

// 签核记录
export function patrolSignRecord(data) {
  return request({
    url: '/patrolApprove/getApproveLog',
    method: 'get',
    params: data
  });
}

// 判断是否有签核权限
export function patrolSignAuth(data) {
  return request({
    url: '/patrolApprove/getIsSign',
    method: 'get',
    params: data
  });
}

// 撤回
export function patrolSignWithdraw(data) {
  return request({
    url: '/patrolCentre/revoked',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data
  });
}
