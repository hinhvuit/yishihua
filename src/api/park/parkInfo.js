import request, { requestFrom } from '@/utils/request'
import Qs from 'qs';
// 查询园区概况列表
export function listParkInfo(data) {
  return requestFrom({
    url: '/api/goods/parkInfo/getInfoByParkKey',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 查询节假日列表
export function getHolidaylist(query) {
  return request({
    url: '/api/goods/festInfo/list',
    method: 'get',
    params: query
  })
}

// 节假日查详情
export function getInfo(data) {
  return requestFrom({
    url: '/api/goods/festInfo/getInfo',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 修改园区概况
export function updateParkInfo(data) {
  return request({
    url: '/api/goods/parkInfo/edit',
    method: 'post',
    data: data
  })
}

export function updateDayEdit(data) {
  return request({
    url: '/api/goods/festInfo/edit',
    method: 'post',
    data: data
  })
}

export function listByParkKey(data) {
  return requestFrom({
      url: '/api/goods/groupInfo/listByParkKey',
      method: 'post',
      data: Qs.stringify(data)
  })
}

export function queryPersonInfoByJobNo(data) {
  return requestFrom({
      url: '/api/goods/parkInfo/queryPersonInfoByJobNo',
      method: 'post',
      data: Qs.stringify(data)
  })
}

export function querySecurityPersonInfoByJobNo(data) {
  return requestFrom({
      url: '/api/goods/parkInfo/querySecurityPersonInfoByJobNo',
      method: 'post',
      data: Qs.stringify(data)
  })
}
export function groupInfolist(query) {
  return request({
      url: '/api/goods/groupInfo/list',
      method: 'get',
      params: query
  })
}