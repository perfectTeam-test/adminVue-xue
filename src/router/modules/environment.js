/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const environmentRouter = {
  path: '/environment',
  component: Layout,
  redirect: '/environment/list',
  name: 'environment',
  alwaysShow: true,
  meta: {
    title: '环境管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/admin/environment/index'),
      name: '环境',
      meta: { title: '环境列表' }
    },
    {
      path: 'add',
      component: () => import('@/views/admin/environment/index'),
      name: '环境添加',
      meta: { title: '环境添加' }
    }
  ]
}
export default environmentRouter
