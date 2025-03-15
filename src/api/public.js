import request from '@/utils/request';
import axios from 'axios';
export function openFile(url) {
  axios
    .get(url, {
      responseType: 'blob'
    })
    .then((res) => {
      window.open(URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' })));
    })
    .catch((err) => {
      console.log(err);
    });
}

// 根据工号获取员工信息
export function getEmpInfo(id) {
  return request({
    url: `/PeopleInfo/${id}`,
    method: 'get'
  });
}
// 获取园区管理园
export function getParkAdmin() {
  return request({
    url: '/ApplicationApprove/getParkAdmin',
    method: 'get'
  });
}

// 获取大陆安全主管
export function getAdmin() {
  return request({
    url: '/ControlPeople/getBossList',
    method: 'get'
  });
}

// 获取所有园区
export function getAllPark() {
  return request({
    url: '/parkInfo',
    method: 'get'
  });
}

// 刷新默认园区
export function refreshDefaultPark() {
  return request({
    url: '/refreshDefaultPark',
    method: 'post'
  });
}

// 大陆安全通报免登录
export function freeLogin(token) {
  return request({
    url: '/freeLogin?token='+token,
    method: 'get',
    baseURL:'/safe-api'
  });
}
