/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: '/manage/list',
  name: 'manage',
  alwaysShow: true,
  meta: {
    title: '查询管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/admin/manage/index'),
      name: '查询管理',
      meta: { title: '查询管理' }
    }
  ]
}
export default manageRouter
