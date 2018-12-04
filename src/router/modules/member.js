/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const memberRouter = {
  path: '/member',
  component: Layout,
  redirect: 'member',
  name: 'member',
  alwaysShow: true,
  meta: {
    title: '会员管理',
    icon: 'component'
  },
  children: [
    {
      path: 'member',
      component: () => import('@/views/admin/member/index'),
      name: 'member',
      meta: { title: '便利购查询会员' }
    },
    {
      path: 'zhuMember',
      component: () => import('@/views/admin/member/zhuMember'),
      name: '主商城会员',
      meta: { title: '主商城查询会员' }
    }
  ]
}

export default memberRouter
