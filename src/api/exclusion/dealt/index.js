// 待办
import request from '@/utils/request';

// 获取审核列表
export function getDealtList(data) {
  return request({
    url: '/ApplicationApprove',
    method: 'get',
    params: data
  });
}

// 签核
export function getSignOff(data) {
  return request({
    url: '/ApplicationApprove/sign',
    method: 'post',
    data: data
  });
}

// 获取文件列表
export function getFileList(data) {
  return request({
    url: '/indexFile',
    method: 'get',
    params: data
  });
}


// 访客申请待审核
export function getSignRecordList(data) {
  return request({
    url: '/dev-api/visitor-main/getSignRecordList_v3',
    method: 'post',   
    data:data
  })
}