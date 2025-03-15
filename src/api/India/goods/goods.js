import request from '@/utils/request'
import qs from 'qs'

//申请表单
export function form(data) {
    return request({
      url: '/goods-form/form',
      method: 'post',
      data
    })
  }

//查询审核列表(待审核，审核记录)
export function reviewedList(data) {
    return request({
      url: '/goods-form/reviewedList',
      method: 'post',
      data     
    })
  }

//查询详情
export function detail(formNumber) {
    const data={formNumber}
    return request({
      url: '/goods-form/detail',
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },      
      data:qs.stringify(data)
    })
  }

//我的记录
export function formListLog(data) {
  return request({
    url: '/goods-form/formListLog',
    method: 'post',
    data     
  })
}

//查询放行单列表（申请记录，检验记录，放行单管理）
export function List(data) {
  return request({
    url: '/goods-form/List',
    method: 'post',
    data     
  })
}

//员工本人信息
export function getPersonByEmployNo(employNo) {
  const data={employNo}
  return request({
    url: '/api/personel/personel/getPersonByEmployNo',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },      
    data:qs.stringify(data)
  })
}

//咨安保存图片
export function savePicture(data) {
  return request({
    url: '/goods-form/savePicture',
    method: 'post',
    data     
  })
}

// 多园区放行门岗
export function gateList(pID) {
  const data = { pID };
  return request({
    url: `/api/gate/appList`,
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data),
  })
}