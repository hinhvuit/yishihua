import request from '@/utils/request';

// 文件上传
export function uploadFile(data) {
  return request({
    url: '/uploadFileByMinio/upload',
    method: 'post',
    data: data
  });
}

// 获取异常记录
export function getAbnormalRecord(data) {
  return request({
    url: '/patrolCentre/getErrorPushList',
    method: 'get',
    params: data
  });
}

// 提报异常
export function reportAbnormal(data) {
  return request({
    url: '/patrolCentre/pushError',
    method: 'post',
    data: data
  });
}

// 获取详情
export function getInfoByNumberAndType(data) {
  return request({
    url: '/patrolApprove/getInfoByNumberAndType',
    method: 'get',
    params: data
  });
}

// 获取中央巡查记录
export function getPatrolCentreRecord(data) {
  return request({
    url: '/patrolCentre/getPatrolCentreByPage',
    method: 'get',
    params: data
  });
}

// 获取自查记录
export function getSelfPatrolRecord(data) {
  return request({
    url: '/patrolPark',
    method: 'get',
    params: data
  });
}

// 开始自查
export function startSelfPatrol(data) {
  return request({
    url: '/patrolApprove/startPatrol',
    method: 'post',
    data: data
  });
}

// 获取暂存
export function getTemporary(id) {
  return request({
    url: `/patrolTemporary/${id}/1`,
    method: 'get'
  });
}

// 暂存-开始巡查
export function savePatrol(data) {
  return request({
    url: '/patrolTemporary',
    method: 'post',
    data: { type: 1, ...data }
  });
}

// 中央巡查雷达图
export function getPatrolCentreRadar(data) {
  return request({
    url: '/patrolPark/getRadar',
    method: 'get',
    params: data
  });
}

// 自检自查雷达图
export function getSelfPatrolRadar(data) {
  return request({
    url: '/patrolPark/getRadarByNumber',
    method: 'get',
    params: data
  });
}
