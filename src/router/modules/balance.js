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
      path: 'recharge',
      component: () => import('@/views/admin/balance/index'),
      name: 'recharge',
      meta: { title: '会员充值' }
    }
  ]
}

export default balanceRouter
