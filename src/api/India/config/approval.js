import request from '@/utils/request'
import qs from 'qs'

// 查询签核核准人管理列表
export function listPersonel(query) {
  return request({
    url: '/dev-api/api/personel/personel/list',
    method: 'get',
    params: query
  })
}

// 查询签核核准人管理详细
export function getPersonel(id) {
  return request({
    url: '/dev-api/api/personel/personel/' + id,
    method: 'get'
  })
}

// 新增签核核准人管理
export function addPersonel(data) {
  return request({
    url: '/dev-api/api/personel/personel/',
    method: 'post',
    data:data
  })
}

// 修改签核核准人管理
export function updatePersonel(data) {
  return request({
    url: '/dev-api/api/personel/personel/',
    method: 'put',
    data: data
  })
}

// 删除签核核准人管理
export function delPersonel(id) {
  return request({
    url: '/dev-api/api/personel/personel/' + id,
    method: 'delete',
  })
}

//根据工号查询员工信息
export function getPersonByEmployNo(employNo) {
  const data={employNo}
  return request({
    url: '/dev-api/api/personel/personel/getPersonByEmployNo',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  })
}

