// 人脸识别记录
import request from '@/utils/request';
import Qs from 'qs';

// 人脸识别接口
export function IdentifyPersonPC(data) {
  return request({
    url: '/tbAuthorityUser/IdentifyPersonPC',
    method: 'post',
    data: data,
    timeout: 20 * 1000 // 设置超时时间为20s
  })
}
// 人脸识别得到数据
export function selectPersonDetailed(data) {
  return request({
    url: '/tbAuthorityUser/selectPersonDetailed',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'post',
    data: Qs.stringify(data),
  })
}

// 多人脸识别
export function faceDetection(data) {
  return request({
    url: '/tbAuthorityUser/faceDetection',
    method: 'post',
    timeout: 60 * 1000, // 设置超时时间为60s
    data:data
  });
}
// 多人脸识别
export function selectAuthorityIdentifyTime(data) {
  return request({
    url: '/tbAuthorityUser/selectAuthorityIdentifyTime',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'post',
    data: Qs.stringify(data),
  })
}