/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: '/manage/list',
  name: 'manage',
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
    // {
    //   path: 'add',
    //   component: () => import('@/views/environment/index'),
    //   name: '环境添加',
    //   meta: { title: '环境添加' }
    // }
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inlineEditTable'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'inlineEditTable' }
    // },
    // {
    //   path: 'tree-table',
    //   component: () => import('@/views/table/treeTable/treeTable'),
    //   name: 'TreeTableDemo',
    //   meta: { title: 'treeTable' }
    // },
    // {
    //   path: 'custom-tree-table',
    //   component: () => import('@/views/table/treeTable/customTreeTable'),
    //   name: 'CustomTreeTableDemo',
    //   meta: { title: 'customTreeTable' }
    // },
    // {
    //   path: 'environment',
    //   component: () => import('@/views/table/complexTable'),
    //   name: 'environment',
    //   meta: { title: '环境管理' }
    // }
  ]
}
export default manageRouter
