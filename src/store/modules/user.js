import { login, logout, getInfo, getPermission, getDefaultPark, xiangXinLogout } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { getPark, setPark, removePark } from '@/utils/park';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    id: '',
    name: '',
    nickName: '',
    phone: '',
    email: '',
    roles: [],
    permissions: [],
    parks: [],
    permissionRouter: []
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            setToken(res.token);
            this.token = res.token;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户默认园区和园区列表
    getDefaultPark() {
      return new Promise((resolve, reject) => {
        getDefaultPark()
          .then((res) => {
            let defaultPark = '';
            const parks = res.data.map((item) => {
              if (item.isDefault) defaultPark = item.pid;
              return { code: item.pcode, id: item.pid, name: item.pname, isDefault: item.isDefault };
            });
            setPark(defaultPark);
            this.parks = parks;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getPermission() {
      return new Promise((resolve, reject) => {
        getPermission()
          .then((res) => {
            const list = [];
            const permissionRouterList = [];
            res.data.forEach((item) => {
              if (item.permissionChar) list.push(item.permissionChar);
              if (item.type === 1) permissionRouterList.push(item);
            });
            // this.permissions = ['*:*:*', ...list];
            this.permissions = [...list];
            this.permissionRouter = [...permissionRouterList];
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise(async (resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const nickName = user.nickName;
            // this.permissions = ['*:*:*', 'exclusion', ...res.permissions];
            this.roles = ['ROLE_DEFAULT'];
            // if (res.roles && res.roles.length > 0) {
            //   // 验证返回的roles是否是一个非空数组
            //   this.roles = res.roles;
            //   this.permissions = res.permissions;
            // } else {
            //   this.roles = ['ROLE_DEFAULT'];
            // }
            this.email = res.user.email;
            this.id = user.userId;
            this.name = user.userName;
            this.nickName = nickName;
            this.phone = user.phonenumber;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        let xiangXinURL = '';
        xiangXinLogout()
          .then((res) => {
            xiangXinURL = res.data ? res.data : xiangXinURL;
            return logout(this.token);
          })
          .then(() => {
            this.token = '';
            this.roles = [];
            this.permissions = [];
            removeToken();
            removePark();
            if (xiangXinURL) {
              window.location.href = xiangXinURL;
            } else {
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    remUser() {
      this.token = '';
      this.roles = [];
      this.permissions = [];
      removeToken();
      removePark();
    },
    // 获取当前园区
    getNowPark() {
      let id = getPark();
      let park = this.parks.find((item) => {
        return item.id == id;
      });
      return park;
    }
  }
});

export default useUserStore;
