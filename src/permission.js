import router from './router';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken, setToken } from '@/utils/auth';
import { isHttp } from '@/utils/validate';
import { isRelogin } from '@/utils/request';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import useParkStore from '@/store/modules/park';
import { getRedirectParams } from '@/utils';
import { checkIsNewUser } from '@/api/login';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/register'];
const homeList = ['/home/index', '/home/exclusion', '/home/visitor', '/home/share'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 拦截带有token参数的login路由 实现免登陆
  if (to.path === '/login' && to.query.token) {
    setToken(to.query.token);
    if (to.query.redirect) {
      next({ path: to.query.redirect, query: getRedirectParams(to.query.redirect) });
    } else {
      next({ path: '/home/index' });
    }
    NProgress.done();
    return;
  }
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title);
    /* has token*/
    if (to.path === '/login') {
      if (to.query.redirect) {
        next({ path: to.query.redirect, query: getRedirectParams(to.query.redirect) });
      } else {
        next({ path: '/' });
      }
      NProgress.done();
    } else if (whiteList.indexOf(to.path) !== -1) {
      next();
    }
    // else if (homeList.indexOf(to.path) !== -1) {
    //   useParkStore().getAllPark();
    //   if (useUserStore().roles.length === 0) {
    //     isRelogin.show = true;
    //     useUserStore()
    //       .getDefaultPark()
    //       .then(() => {
    //         return useUserStore().getInfo();
    //       })
    //       .then(() => {
    //         return useUserStore().getPermission();
    //       })
    //       // 判断当前用户是否已拉取完user_info信息
    //       .then(() => {
    //         isRelogin.show = false;
    //         return usePermissionStore().generateRoutes();
    //       })
    //       .then((accessRoutes) => {
    //         // 根据roles权限生成可访问的路由表
    //         accessRoutes.forEach((route) => {
    //           if (!isHttp(route.path)) {
    //             router.addRoute(route); // 动态添加可访问路由表
    //           }
    //         });
    //         next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
    //       })
    //       .catch((err) => {
    //         useUserStore()
    //           .logOut()
    //           .then(() => {
    //             ElMessage.error(err);
    //             next({ path: '/home/index' });
    //           });
    //       });
    //   } else {
    //     next();
    //   }
    // }
    else {
      useParkStore().getAllPark();
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true;
        useUserStore()
          .getDefaultPark()
          .then(() => {
            return useUserStore().getInfo();
          })
          .then(() => {
            return useUserStore().getPermission();
          })
          // 判断当前用户是否已拉取完user_info信息
          .then(() => {
            isRelogin.show = false;
            return usePermissionStore().generateRoutes();
          })
          .then((accessRoutes) => {
            // 根据roles权限生成可访问的路由表
            accessRoutes.forEach((route) => {
              if (!isHttp(route.path)) {
                router.addRoute(route); // 动态添加可访问路由表
              }
            });
            return checkIsNewUser();
          })
          .then((res) => {
            let redirect = to.query.redirect ? to.query.redirect : from.query.redirect;
            if (res.data) {
              next({ path: `/reset`, query:{redirect:redirect}, replace: true });
            } else {
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            }
          })
          .catch((err) => {
            useUserStore().remUser()
            ElMessage.error(err);
            next({ path: '/home/index' });
            // useUserStore()
            //   .logOut()
            //   .then(() => {
            //     ElMessage.error(err);
            //     next({ path: '/home/index' });
            //   });
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else if (to.path.includes('/home/')) {
      // to.path.includes('/home/')
      // homeList.indexOf(to.path) !== -1
      next();
    } else {
      next(`/home/index`); // 否则全部重定向到首页
      // next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到首页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
