import request, { requestFrom } from '@/utils/request';
import Qs from 'qs';

// 获取赋能园区列表
export function getParkList() {
  return request({
    headers: {
      isToken: false
    },
    url: '/file/getEmpowerParkList',
    method: 'get'
  });
}
// 获取客户端列表
export function getClientList() {
  return request({
    headers: {
      isToken: false
    },
    url: '/file/getClientList',
    method: 'get'
  });
}
// 获取开发语言列表
export function getLanguageList() {
  return request({
    headers: {
      isToken: false
    },
    url: '/file/getDevLanguageList',
    method: 'get'
  });
}

// 根据园区查询总浏览量和今日浏览量
export function selectBrowseTotal(data) {
  return requestFrom({
    headers: {
      isToken: false
    },
    url: '/frontConsole/selectBrowseTotal',
    method: 'post',
    data: Qs.stringify(data)
  });
}

// 查询排行榜
export function selectGeneralList(data) {
  return requestFrom({
    headers: {
      isToken: false
    },
    url: '/frontConsole/selectGeneralList',
    method: 'post',
    data: Qs.stringify(data)
  });
}

// 查询banner图
export function selectBanner() {
  return requestFrom({
    headers: {
      isToken: false
    },
    url: '/frontConsole/selectBanner',
    method: 'post'
  });
}

// 首页系统应用查询
export function selectAppList(data) {
  return requestFrom({
    headers: {
      isToken: false
    },
    url: '/frontConsole/selectFileMainSearchByPage',
    method: 'post',
    data: Qs.stringify(data,{ arrayFormat: 'repeat' })
  });
}

// 系统应用详情查询
export function getApp(data) {
  return requestFrom({
    headers: {
      isToken: false
    },
    url: '/frontConsole/selectMainById',
    method: 'post',
    data: Qs.stringify(data)
  });
}