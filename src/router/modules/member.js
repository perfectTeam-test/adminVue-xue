/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const memberRouter = {
  path: '/member',
  component: Layout,
  redirect: 'member',
  name: 'member',
  meta: {
    title: '会员管理',
    icon: 'component'
  },
  children: [
    {
      path: 'member',
      component: () => import('@/views/admin/member/index'),
      name: 'member',
      meta: { title: '查询会员' }
    },

    {
      path: 'member1',
      component: () => import('@/views/admin/member/index'),
      name: 'member1',
      meta: { title: '查询会员1' }
    }

  ]
}

export default memberRouter
