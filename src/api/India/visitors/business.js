import request from '@/utils/request'
import qs from 'qs'


// web——查询访客单——分页
export function getApplicationEnterGuestPage(data) {
  return request({
    url: '/visitor-application-enter-guest/getMainPage',
    method: 'post',
    data
  })
}

// 预约接待——并单接待
export function consolidation(numbers) {
  const data={numbers}
    return request({
      url: '/visitor-main/visitor/consolidation',
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify(data)
    })
  }

// 预约接待——并单
export function consolidationSubmit(visitorMainConsolidationParm) {
    return request({
      url: '/visitor-main/visitor/consolidationSubmit',
      method: 'post',
      data:visitorMainConsolidationParm
    })
  }



//详情
export function getByEmployeeId(id) {
  const data={id}
  return request({
    url: '/visitor-application-enter-guest/getByEmployeeId_v2',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  })
}

//根据id，查询审核信息
export function getMainById(mainNumber) {
  const data={mainNumber}
  return request({
    url: '/visitor-main/getMainById_v2',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  })
}

//是否显示签核状态控制组件
export function isShow(businessKey) {
  const data={businessKey}
  return request({
    url: '/api/signToolApi/isShow',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  })
}

//申请单审核
export function examine(employeeno,businessKey,signResult,remark,businessType) {
  const data={employeeno,businessKey,signResult,remark,businessType}
  return request({
    url: '/api/signToolApi/examine',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  })
}

//访客业务我的记录
export function visitorBusinessLogList(data) {
  return request({
    url: '/api/signToolApi/getMyRecordList',
    method: 'post',
    data
  })
}

//预约接待记录列表
export function getByEmployeeNo_v2(employeeNo) {
  const data={employeeNo}
  return request({
    url: '/visitor-application-enter-guest/getByEmployeeNo_v2',
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(data)
  })
}

//访客单终止操作
export function termination(mainNumber) {
  const data={mainNumber}
  return request({
    url: '/visitor-application-enter-guest/termination',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'post',
    data: qs.stringify(data)
  })
}

//查询防疫资料
export function selectOne(sonTabelId,sonTabelType) {
  // const data={sonTabelId,sonTabelType}
  return request({
    url: '/api/visitorPreventEpidemic/visitorPreventEpidemic/selectOne',
    method: 'get',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    params: {
      sonTabelId:sonTabelId,
      sonTabelType:sonTabelType
    }
  })
}

//连续签核查询接口
export function querySignCount(paramType) {
  const data={paramType}
  return request({
    url: '/api/conSign/querySignCount',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'post',
    data: qs.stringify(data)    
  })
}

// 拒绝接待
export function rejectReceive(numbers,rejectReason) {
  const data = { numbers,rejectReason };
  return request({
    url: '/visitor-main/rejectReceive',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },    
    method: 'post',
    data: qs.stringify(data)    
  })
}
//是否显示签核状态控制组件（业务过期的不显示）
export function businessIsShow(businessKey,businessType) {
  const data = { businessKey,businessType };
  return request({
    url: '/api/signToolApi/businessIsShow',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },    
    method: 'post',
    data: qs.stringify(data)    
  })
}