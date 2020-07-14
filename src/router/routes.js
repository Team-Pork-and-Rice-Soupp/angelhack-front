
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/SignIn.vue') }
    ]
  },
  {
    path: '/ProjectList',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/ProjectList.vue') }
    ]
  },
  {
    path: '/AddProject',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/AddProject.vue') }
    ]
  },


  {
    path: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/Dashboard.vue') }
    ]
  },

  {
    path: '/EditWorkspace',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/EditWorkspace.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
