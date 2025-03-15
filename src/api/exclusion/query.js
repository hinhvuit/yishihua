// 列管人员查询
import request from '@/utils/request';

// 查询管控人员
export function getExclusionPeople(data) {
  return request({
    url: '/ControlPeople',
    method: 'get',
    params: data
  });
}

// 获取查询列表
export function getQueryList(data){
  return request({
    url: '/ControlPeople/getSelectLog',
    method: 'get',
    params: data
  });
}
