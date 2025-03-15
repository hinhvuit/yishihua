import request from '@/utils/request';
import { parseStrEmpty } from '@/utils/ruoyi';

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  };
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  });
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  };
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  });
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  });
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  });
}


