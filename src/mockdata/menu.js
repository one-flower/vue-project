// {
//     path: '/data',
//     component: Layout,
//     redirect: '/data/docking',
//     name: 'Data',
//     meta: { title: '数据采集', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'docking',
//         name: 'Docking',
//         component: () => import('@/views/docking/index'),
//         meta: { title: '数据对接', icon: 'table' }
//       },
//       {
//         path: 'tree',
//         name: 'Tree',
//         component: () => import('@/views/tree/index'),
//         meta: { title: 'Tree', icon: 'tree' }
//       }
//     ]
//   },

export const menuData = [
  {
    id: '1',
    parent_id: '0',
    path: '',
    component: 'layout',
    redirect: '/data/docking',
    name: '发热购药管理系统',
    meta: { title: '发热购药管理系统', icon: 'el-icon-s-help' },
  },
  {
    id: '2',
    parent_id: '1',
    path: 'manage/pharmacy',
    component: 'manage/pharmacy',
    name: '药房信息管理',
    meta: { title: '药房信息管理(监管局)', icon: 'table', noCache: false, },

  },
  {
    id: '4',
    parent_id: '1',
    path: 'manage/buyer',
    component: 'manage/buyer',
    name: '购药人员统计',
    meta: { title: '购药人员统计', icon: 'table' },
  },
  {
    id: '5',
    parent_id: '1',
    path: 'store/pharmacy',
    component: 'store/pharmacy',
    name: '购药人员统计',
    meta: { title: '药房信息管理(药房)', icon: 'table' },
  },
  {
    id: '100',
    parent_id: '0',
    path: '/model',
    component: 'layout',
    redirect: '/model/business',
    name: 'Data',
    meta: { title: '模型管理', icon: 'el-icon-s-help' },
  },
  {
    id: '101',
    parent_id: '100',
    path: 'business',
    component: 'business',
    name: 'Business',
    meta: { title: '营商环境', icon: 'el-icon-s-help' },
  },

  {
    id: '102',
    parent_id: '100',
    path: 'land',
    component: 'land',
    name: 'Land',
    meta: { title: '土地征收', icon: 'el-icon-s-help' },
  },

  {
    id: '9103',
    parent_id: '100',
    path: 'land1',
    component: 'land',
    name: 'Land',
    meta: { title: '财政资金', icon: 'el-icon-s-help' },
  },

  {
    id: '104',
    parent_id: '100',
    path: 'land2',
    component: 'land',
    name: 'Land',
    meta: { title: '涉农补贴', icon: 'el-icon-s-help' },
  },

  {
    id: '99900',
    parent_id: '0',
    path: '/system',
    component: 'layout',
    name: 'system',
    meta: { title: '基础设置', icon: 'el-icon-s-help' },
  },

  {
    id: '99901',
    parent_id: '99900',
    path: 'menu',
    component: 'menu',
    name: 'menuPage',
    meta: { title: '菜单', icon: 'el-icon-s-help' },
  },

  {
    id: '99902',
    parent_id: '99900',
    path: 'role',
    component: 'role',
    name: 'role',
    meta: { title: '角色', icon: 'el-icon-s-help' },
  },

  {
    id: '99903',
    parent_id: '99900',
    path: 'user',
    component: 'user',
    name: 'user',
    meta: { title: '用户', icon: 'el-icon-s-help' },
  },

  {
    id: '99904',
    parent_id: '99900',
    path: 'company',
    component: 'company',
    name: 'company',
    meta: { title: '机构', icon: 'el-icon-s-help' },
  },

  {
    id: '888',
    parent_id: '0',
    path: '/test',
    component: 'layout',
    name: 'test',
    meta: { title: '实验室', icon: 'el-icon-s-help' },
  },

  {
    id: '88801',
    parent_id: '888',
    path: 'pdf',
    component: 'pdf',
    name: 'pdf',
    meta: { title: 'pdf', icon: 'el-icon-s-help' },
  },

  {
    id: '88802',
    parent_id: '888',
    path: 'echarts',
    component: 'echarts',
    name: 'echarts',
    meta: { title: '图表', icon: 'el-icon-s-help' },
  },

  {
    id: '88803',
    parent_id: '888',
    path: 'echartspoints',
    component: 'echartspoints',
    name: 'echartspoints',
    meta: { title: '海量点显示', icon: 'el-icon-s-help' },
  },

  {
    id: '88804',
    parent_id: '888',
    path: 'mapgride',
    component: 'mapgride',
    name: 'mapgride',
    meta: { title: '地图网格', icon: 'el-icon-s-help' },
  },

  {
    id: '88805',
    parent_id: '888',
    path: 'vue3test',
    component: 'vue3test',
    name: 'vue3test',
    meta: { title: 'vue3探索', icon: 'el-icon-s-help' },
  },


]