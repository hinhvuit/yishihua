import { createWebHistory, createRouter } from 'vue-router';
import { checkIsNewUser } from '@/api/login';
import { translate as $t } from '@/language'

/* Layout */
import Layout from '@/layout';
import Layout_home from '@/layout_home';

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
    isHome: true                    // 当路由是否在home页面显示。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/reset',
    component: () => import('@/views/resetPwd'),
    hidden: true,
    beforeEnter: async (to, from) => {
      // reject the navigation
      const { data } = await checkIsNewUser();
      if (!data) return '/';
    }
  },
  {
    path: '',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: $t('public.Home'), icon: 'gongzuotai', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dealt',
    component: Layout_home,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dealt/index'),
        name: 'DealtIndex',
        meta: { title: '审核列表', icon: 'dashboard' }
      },
      {
        path: 'record',
        component: () => import('@/views/dealt/record'),
        name: 'DealtRecord',
        meta: { title: '审核列表', icon: 'dashboard' }
      },
      {
        path: 'exclusionInfo/:number',
        component: () => import('@/views/dealt/exclusion/info'),
        name: 'DealtExclusionInfo',
        meta: { title: '审核详情', noCache: true }
      },
      {
        path: 'exclusionDetails/:number',
        component: () => import('@/views/dealt/exclusion/details'),
        name: 'DealtExclusionDetails',
        meta: { title: '审核详情', noCache: true }
      },
      {
        path: 'patrolStartInfo/:number/:type',
        component: () => import('@/views/dealt/patrol/startInfo'),
        name: 'PatrolStartInfo',
        meta: { title: '发起巡查审核', noCache: true }
      },
      {
        path: 'patrolCentreInfo/:number/:type',
        component: () => import('@/views/dealt/patrol/centreInfo'),
        name: 'PatrolCentreInfo',
        meta: { title: '中央巡查审核', noCache: true }
      },
      {
        path: 'patrolAbnormalInfo/:number/:type',
        component: () => import('@/views/dealt/patrol/abnormalInfo'),
        name: 'PatrolAbnormalInfo',
        meta: { title: '异常处理审核', noCache: true }
      },
      {
        path: 'patrolSelfInfo/:number/:type',
        component: () => import('@/views/dealt/patrol/selfInfo'),
        name: 'PatrolSelfInfo',
        meta: { title: '自查自检审核', noCache: true }
      },
      {
        path: 'patrolStartDealt/:number/:type',
        component: () => import('@/views/dealt/patrol/detail/startInfo'),
        name: 'PatrolStartDealt',
        meta: { title: '发起巡查审核记录', noCache: true }
      },
      {
        path: 'patrolCentreDealt/:number/:type',
        component: () => import('@/views/dealt/patrol/detail/centreInfo'),
        name: 'PatrolCentreDealt',
        meta: { title: '中央巡查审核记录', noCache: true }
      },
      {
        path: 'patrolAbnormalDealt/:number/:type',
        component: () => import('@/views/dealt/patrol/detail/abnormalInfo'),
        name: 'PatrolAbnormalDealt',
        meta: { title: '异常处理审核记录', noCache: true }
      },
      {
        path: 'patrolSelfDealt/:number/:type',
        component: () => import('@/views/dealt/patrol/detail/selfInfo'),
        name: 'PatrolSelfDealt',
        meta: { title: '自查自检审核记录', noCache: true }
      },
      {
        path: 'self/:number',
        component: () => import('@/views/dealt/patrol/add'),
        name: 'DealtPatrolSelfAdd',
        meta: { title: '开始自查自检', noCache: true }
      },
      {
        path: 'abnormal/:number',
        component: () => import('@/views/dealt/patrol/update'),
        name: 'DealtPatrolAbnormalUpdate',
        meta: { title: '异常处理', noCache: true }
      },
      {
        path: 'visitors/details/:id',
        component: () => import('@/views/dealt/visitors/details'),
        name: 'visitorsDetailsSign',
        meta: { title: $t('public.visitorDetails'), noCache: true }
      },
      {
        path: 'goods/details/:id',
        component: () => import('@/views/dealt/goods/details'),
        name: 'goodsDetailsSign',
        meta: { title: $t('public.materialReleaseDetails'), noCache: true }
      },
    ]
  },
  {
    path: '/home',
    component: Layout_home,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index'),
        name: 'Home'
      },
      {
        path: 'share',
        component: () => import('@/views/home/share'),
        name: 'Share'
      },
      {
        path: 'shareInfo/:number',
        component: () => import('@/views/home/info'),
        name: 'ShareInfo'
      }
    ]
  }
];

// 前台路由 写死 但根据permissions进行权限管控
export const trendsRouters = [
  // // 园区信息
  // {
  //   path: '/garden',
  //   component: Layout,
  //   name: 'ParkAdmin',
  //   meta: { title: '园区信息', icon: 'yuanquxinxi', isRecord: false },
  //   permissions: ['yqxx'],
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'garden',
  //       component: () => import('@/views/park/parkInfo'),
  //       name: 'parkInfo',
  //       permissions: ['yqgkxx'],
  //       meta: {
  //         title: '园区概况信息',
  //         icon: '',
  //         isHome: true,
  //         noCache: true,
  //         image: 'yuanqugaikuangxinxi'
  //       }
  //     },
  //     {
  //       path: 'holidayInfo',
  //       component: () => import('@/views/park/holidayInfo'),
  //       name: 'holidayInfo',
  //       permissions: ['jjrxx'],
  //       meta: {
  //         title: '节假日信息统计',
  //         icon: '',
  //         isHome: true,
  //         image: 'jiejiarixinxitongji'
  //       }
  //     }
  //   ]
  // },
  // // 不受欢迎名单
  // {
  //   path: '/exclusion',
  //   component: Layout,
  //   name: 'ExclusionAdmin',
  //   meta: { title: '不受欢迎名单', icon: 'bushouhuanyinmindan', isRecord: true },
  //   permissions: ['bshymd'],
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'apply',
  //       component: () => import('@/views/exclusion/apply'),
  //       name: 'ExclusionApply',
  //       permissions: ['lgsq'],
  //       meta: {
  //         title: '申请列管',
  //         icon: '',
  //         noCache: true,
  //         isHome: true,
  //         image: 'shenqinglieguan'
  //       }
  //     },
  //     {
  //       path: 'cancel',
  //       component: () => import('@/views/exclusion/cancel'),
  //       name: 'ExclusionCancel',
  //       permissions: ['jclg'],
  //       meta: {
  //         title: '解除列管',
  //         icon: '',
  //         noCache: true,
  //         isHome: true,
  //         image: 'jiechuliebiao'
  //       }
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/exclusion/list'),
  //       name: 'ExclusionList',
  //       permissions: ['lgmd'],
  //       meta: { title: '申请记录', icon: '', noCache: true, isHome: false }
  //     },
  //     {
  //       path: 'query',
  //       component: () => import('@/views/exclusion/query'),
  //       name: 'ExclusionQuery',
  //       permissions: ['cxmd'],
  //       meta: {
  //         title: '查询名单',
  //         icon: '',
  //         noCache: true,
  //         isHome: true,
  //         image: 'chaxunxinxi'
  //       }
  //     }
  //   ]
  // },
  // // 访客资料库
  // {
  //   path: '/visitor',
  //   component: Layout,
  //   name: 'VisitorAdmin',
  //   meta: { title: '访客资料库', icon: 'fangkeziliaoku', isRecord: false },
  //   permissions: ['fkzlk'],
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'query',
  //       component: () => import('@/views/visitor/query'),
  //       name: 'VisitorQuery',
  //       permissions: ['fkxxcx'],
  //       meta: {
  //         title: '访客信息查询',
  //         icon: '',
  //         isHome: true,
  //         image: 'fangkexinxichaxun'
  //       }
  //     },
  //     {
  //       path: 'enter',
  //       component: () => import('@/views/visitor/enter'),
  //       name: 'VisitorEnter',
  //       permissions: ['fkxxlr'],
  //       meta: {
  //         title: '访客信息录入',
  //         icon: '',
  //         isHome: true,
  //         image: 'fangkeziliaoluru'
  //       }
  //     },
  //     {
  //       path: 'enter/:number',
  //       component: () => import('@/views/visitor/detail'),
  //       permissions: ['fkxxlr'],
  //       name: 'VisitorEnterDetail',
  //       hidden: true,
  //       meta: { title: '访客信息详情', activeMenu: '/visitor/enter' }
  //     },
  //     {
  //       path: 'query/:number',
  //       component: () => import('@/views/visitor/detail'),
  //       permissions: ['fkxxcx'],
  //       name: 'VisitorQueryDetail',
  //       hidden: true,
  //       meta: { title: '访客信息详情', activeMenu: '/visitor/query' }
  //     }
  //   ]
  // },
  // // 安全巡查
  // {
  //   path: '/patrol',
  //   component: Layout,
  //   name: 'PatrolAdmin',
  //   meta: { title: '安全巡查', icon: 'anquanxuncha', isRecord: true },
  //   permissions: ['aqxc'],
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'selfPatrol',
  //       component: () => import('@/views/patrol/self'),
  //       name: 'SelfPatrol',
  //       permissions: ['aqxc'],
  //       meta: {
  //         title: '园区自查自检',
  //         icon: '',
  //         isHome: true,
  //         image: 'yuanquzijianzicha'
  //       }
  //     },
  //     {
  //       path: 'centrePatrol',
  //       component: () => import('@/views/patrol/centre'),
  //       name: 'CentrePatrol',
  //       permissions: ['aqxc'],
  //       meta: {
  //         title: '中央巡查记录',
  //         icon: '',
  //         isHome: true,
  //         image: 'zhongyangxunchajilu'
  //       }
  //     },
  //     {
  //       path: 'abnormalRecords',
  //       component: () => import('@/views/patrol/abnormalRecords'),
  //       name: 'PatrolAbnormalRecords',
  //       permissions: ['aqxc'],
  //       meta: {
  //         title: '异常记录',
  //         icon: '',
  //         isHome: true,
  //         image: 'yichangjilu'
  //       }
  //     }
  //   ]
  // },
  // // 人脸核验
  // {
  //   path: '/faceRecognition',
  //   component: Layout,
  //   name: 'FaceRecognition',
  //   meta: { title: '人脸核验', icon: 'renlianheyan', isRecord: false },
  //   permissions: ['rlsb'],
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'enter',
  //       component: () => import('@/views/faceRecognition/compare'),
  //       name: 'FaceRecognitionCompare',
  //       permissions: ['sbdb'],
  //       meta: {
  //         title: '核验对比',
  //         icon: '',
  //         isHome: true,
  //         image: 'heyanbidui'
  //       }
  //     },
  //     {
  //       path: 'query',
  //       component: () => import('@/views/faceRecognition/record'),
  //       name: 'FaceRecognitionRecord',
  //       permissions: ['sbjl'],
  //       meta: {
  //         title: '核验记录',
  //         icon: '',
  //         isHome: true,
  //         image: 'heyanjilu'
  //       }
  //     }
  //   ]
  // },
  // // 印度系统访客申请
  // {
  //   path: '/indiayqfk',
  //   component: Layout,
  //   name: 'IndiaVisitors',
  //   meta: { title: $t('public.Indiafkyw'), icon: 'fangke', isRecord: true },
  //   permissions: ['indiayqfk'],
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'visitors',
  //       name: 'visitors',
  //       redirect: '/indiayqfk/visitors/invite',
  //       permissions: ['indiayqfk'],
  //       meta: {
  //         title: $t('public.inviteVisitors'),
  //         icon: '',
  //         isHome: true,
  //         image: 'yaoqingfangke'
  //       },
  //       children: [
  //         {
  //           path: 'invite',
  //           component: () => import('@/views/india/visitors/invite'),
  //           name: 'VisitorsInvite',
  //           permissions: ['indiayqfk'],
  //           meta: {
  //             title: $t('public.inviteVisitors'),
  //             icon: '',
  //             isHome: true,
  //             image: 'yaoqingfangke',
  //           }
  //         },
  //         {
  //           path: 'list',
  //           component: () => import('@/views/india/visitors/index'),
  //           name: 'VisitorsList',
  //           permissions: ['indiayqfk'],
  //           meta: {
  //             title: $t('public.Visitorslist'),
  //             icon: '',
  //             isHome: true,
  //             image: 'yaoqingfangke',
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'visitorsVip',
  //       name: 'visitorsVip',
  //       redirect: '/indiayqfk/visitorsVip/invite',
  //       permissions: ['indiayqfk'],
  //       meta: {
  //         title: $t('public.inviteVIPVisitors'),
  //         icon: '',
  //         isHome: true,
  //         image: 'vipfangke'
  //       },
  //       children: [
  //         {
  //           path: 'invite',
  //           component: () => import('@/views/india/visitors/invite'),
  //           name: 'VisitorsVipInvite',
  //           permissions: ['indiayqfk'],
  //           meta: {
  //             title: $t('public.inviteVIPVisitors'),
  //             icon: '',
  //             isHome: true,
  //             image: 'vipfangke',
  //           }
  //         },
  //         {
  //           path: 'list',
  //           component: () => import('@/views/india/visitors/index'),
  //           name: 'VisitorsVipList',
  //           permissions: ['indiayqfk'],
  //           meta: {
  //             title: $t('public.Visitorslist'),
  //             icon: '',
  //             isHome: true,
  //             image: 'vipfangke',
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // 印度系统访客申请
  {
    path: '/indiayqfk',
    component: Layout,
    name: 'IndiaVisitors',
    meta: { title: $t('public.Indiafkyw'), icon: 'fangke', isRecord: true },
    permissions: ['indiayqfk'],
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'visitors/invite',
        component: () => import('@/views/india/visitors/invite'),
        name: 'VisitorsInvite',
        permissions: ['indiayqfk'],
        meta: {
          title: $t('public.inviteVisitors'),
          icon: '',
          isHome: true,
          image: 'yaoqingfangke',
        }
      },
      {
        path: 'visitorsVip/invite',
        component: () => import('@/views/india/visitors/invite'),
        name: 'VisitorsVipInvite',
        permissions: ['indiayqfk'],
        meta: {
          title: $t('public.inviteVIPVisitors'),
          icon: '',
          isHome: true,
          image: 'vipfangke',
        }
      },
      {
        path: 'visitors/list',
        component: () => import('@/views/india/visitors/index'),
        name: 'VisitorsVipList',
        permissions: ['indiayqfk'],
        meta: {
          title: $t('public.Visitorslist'),
          icon: '',
          isHome: true,
          image: 'fangkeliebiao',
        }
      }
    ]
  },
  // 印度系统物品放行
  {
    path: '/indiagoods',
    component: Layout,
    name: 'IndiaGoods',
    meta: { title: $t('public.IndiamaterialRelease'), icon: 'wupinfangxing', isRecord: true },
    permissions: ['indiawpfx'],
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'goods/apply',
        component: () => import('@/views/india/goods/apply'),
        name: 'GoodsApply',
        permissions: ['indiawpfx'],
        meta: {
          title: $t('public.goodsApplication'),
          icon: '',
          isHome: true,
          image: 'wupinfangxingshenqing',
        }
      },
      {
        path: 'goods/list',
        component: () => import('@/views/india/goods/index'),
        name: 'GoodsList',
        permissions: ['indiawpfx'],
        meta: {
          title: $t('public.materialReleaseList'),
          icon: '',
          isHome: true,
          image: 'wupinfangxingliebiao',
        }
      }
    ]
  },
  // 印度安全通报
  {
    path: '/safe',
    component: Layout,
    name: 'safe',
    meta: {
      title: $t('public.SafeSystem'),
      image: 'anquantongbao',
    },
    redirect: 'noredirect',
    alwaysShow: true,
    hidden: true,
    permissions: 'all',
    children: [
      {
        path: 'index',
        name: 'safeNew',
        permissions: 'all',
        meta: {
          title: $t('public.SafeSystem'),
          icon: '',
          isHome: true,
          image: 'anquantongbao',
        }
      },
    ]
  },
  //A客户
  {
    path: '/acust',
    component: Layout,
    name: 'acust',
    meta: {
      title: $t('public.CustomSystem'),
      image: 'kehubanzheng',
    },
    redirect: 'noredirect',
    alwaysShow: true,
    hidden: true,
    permissions: 'all',
    children: [
      {
        path: 'index',
        name: 'acustNew',
        permissions: 'all',
        meta: {
          title: $t('public.CustomSystem'),
          icon: '',
          isHome: true,
          breadcrumb: false,
          image: 'kehubanzheng',
        }
      },
    ]
  },

];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/exclusion/info',
    component: Layout,
    hidden: true,
    permissions: ['lgsq'],
    children: [
      {
        path: ':number',
        component: () => import('@/views/exclusion/info'),
        name: 'ExclusionInfo',
        meta: { title: '申请详情', activeMenu: '/exclusion/list' }
      }
    ]
  },
  {
    path: '/garden/edit',
    component: Layout,
    hidden: true,
    permissions: ['yqxx'],
    children: [
      {
        path: ':number',
        component: () => import('@/views/park/edit'),
        name: 'editData',
        meta: { title: '修改', activeMenu: '/garden/garden' }
      }
    ]
  },
  {
    path: '/garden/holiday/edit',
    component: Layout,
    hidden: true,
    permissions: ['yqxx'],
    children: [
      {
        path: ':number',
        component: () => import('@/views/park/holiday/edit'),
        name: 'holidayEdit',
        meta: { title: '填写', activeMenu: '/garden/holidayInfo' }
      }
    ]
  },
  {
    path: '/garden/holiday/detail',
    component: Layout,
    hidden: true,
    permissions: ['yqxx'],
    children: [
      {
        path: ':number',
        component: () => import('@/views/park/holiday/detail'),
        name: 'holidayDetail',
        meta: { title: '详情', activeMenu: '/garden/holidayInfo' }
      }
    ]
  },
  {
    path: '/patrol/info',
    component: Layout,
    hidden: true,
    permissions: ['aqxc'],
    children: [
      {
        path: 'abnormal/:number',
        component: () => import('@/views/patrol/abnormalRecords/detail'),
        name: 'PatrolAbnormalRecordsInfo',
        meta: { title: '异常处理详情', activeMenu: '/patrol/abnormalRecords' }
      },
      {
        path: 'centre/:number',
        component: () => import('@/views/patrol/centre/detail'),
        name: 'PatrolCentreRecordsInfo',
        meta: { title: '中央巡查详情', activeMenu: '/patrol/centrePatrol' }
      },
      {
        path: 'self/:number',
        component: () => import('@/views/patrol/self/detail'),
        name: 'PatrolSelfRecordsInfo',
        meta: { title: '自查自检详情', activeMenu: '/patrol/selfPatrol' }
      },
      {
        path: 'chart/center/:number',
        component: () => import('@/views/patrol/centre/radarChart'),
        name: 'CenterRadarChart',
        meta: { title: '中央巡查雷达图', activeMenu: '/patrol/centrePatrol' }
      },
      {
        path: 'chart/self/:number',
        component: () => import('@/views/patrol/self/radarChart'),
        name: 'SelfRadarChart',
        meta: { title: '自查自检雷达图', activeMenu: '/patrol/selfPatrol' }
      }
    ]
  },
  {
    path: '/patrol/add',
    component: Layout,
    hidden: true,
    permissions: ['aqxc'],
    children: [
      {
        path: 'self/:number',
        component: () => import('@/views/patrol/self/add'),
        name: 'PatrolSelfAdd',
        meta: { title: '开始自查自检', activeMenu: '/patrol/selfPatrol' }
      },
      {
        path: 'abnormal/:number',
        component: () => import('@/views/patrol/abnormalRecords/update'),
        name: 'PatrolAbnormalUpdate',
        meta: { title: '异常处理', activeMenu: '/patrol/abnormalRecords' }
      }
    ]
  },
  {
    path: '/indiagoods/goods',
    component: Layout,
    hidden: true,
    permissions: ['indiawpfx'],
    children: [
      {
        path: 'details/:id',
        component: () => import('@/views/india/goods/details'),
        name: 'goodsDetails',
        meta: { title: $t('public.materialReleaseDetails'), activeMenu: '/indiagoods/goods/list', noCache: true }
      },
    ]
  },
  {
    path: '/indiayqfk/visitors',
    component: Layout,
    hidden: true,
    permissions: ['indiayqfk'],
    children: [
      {
        path: 'details/:id',
        component: () => import('@/views/india/visitors/details'),
        name: 'visitorsDetails',
        meta: { title: $t('public.visitorDetails'), activeMenu: '/indiayqfk/visitors/list', noCache: true }
      },
    ]
  },
  {
    path: '/indiayqfk/visitorsVip',
    component: Layout,
    hidden: true,
    permissions: ['indiayqfk'],
    children: [
      {
        path: 'details/:id',
        component: () => import('@/views/india/visitors/details'),
        name: 'visitorsVipDetails',
        meta: { title: $t('public.visitorDetails'), activeMenu: '/indiayqfk/visitorsVip/list', noCache: true }
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
