// 列管名单
import request from '@/utils/request';

// 查询列管申请单列表
export function getControlList(data) {
  return request({
    url: '/ApplicationForm',
    method: 'get',
    params: data
  });
}
