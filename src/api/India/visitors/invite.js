import request from '@/utils/request'
import qs from 'qs'
import {encrypt} from '@/utils/jsencrypt'


// 根据手机号获取——访客信息
export function guardGuestInfoList(phone) {
//   phone=encrypt(phone)
  return request({
    url: '/api/business/guest/guardGuestInfoList?phone='+phone,
    method: 'get',
  })
}

// 根据手机号获取——员工信息
export function personnelInfoList(phone) {
  //   phone=encrypt(phone)
    return request({
      url: '/api/business/personnel/personnelInfoList?phone='+phone,
      method: 'get',
    })
  }



//邀请来访提单
export function VIPUpload(visitorMain) {
    // const data={visitorMain}
    return request({
      url: '/visitor-main/visitor/VIPUpload',
      method: 'post',
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      // data: qs.stringify(data)
      data:visitorMain
      
    })
  }