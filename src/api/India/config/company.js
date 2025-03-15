import request from '@/utils/request'
import qs from 'qs'
// 查询公司管理列表
export function listCompany(query) {
  return request({
    url: '/dev-api/api/company/company/list',
    method: 'get',
    params: query
  })
}

// 查询公司管理详细
export function getInfo(id) {
  return request({
    url: '/dev-api/api/company/company/getInfo?id='+id,
    method: 'get'    
  })
}

// 新增公司管理
export function addCompany(data) {
  return request({
    url: '/dev-api/api/company/company',
    method: 'post',
    data: data
  })
}

// 修改公司管理
export function updateCompany(data) {
  return request({
    url: '/dev-api/api/company/company',
    method: 'put',
    data: data
  })
}

// 删除公司管理
export function delCompany(id) {
  return request({
    url: '/dev-api/api/company/company/' + id,
    method: 'delete'
  })
}
