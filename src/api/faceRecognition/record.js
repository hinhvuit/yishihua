// 人脸识别记录
import request from '@/utils/request';
import Qs from 'qs';

// 人脸识别记录
export function selectIdentifyPersonByPage(data) {
  return request({
    url: '/tbAuthorityUser/selectIdentifyPersonByPage',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'post',
    data: Qs.stringify(data)
  });
}