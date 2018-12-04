/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const balanceRouter = {
  path: '/balance',
  component: Layout,
  redirect: 'balance',
  name: 'balance',
  alwaysShow: true,
  meta: {
    title: '余额管理',
    icon: 'component'
  },
  children: [
    {
      path: 'blgRecharge',
      component: () => import('@/views/admin/balance/blgIndex'),
      name: 'blgRecharge',
      meta: { title: '便利购余额充值' }
    },
    {
      path: 'recharge',
      component: () => import('@/views/admin/balance/index'),
      name: 'recharge',
      meta: { title: '主商城余额充值' }
    }
  ]
}

export default balanceRouter
