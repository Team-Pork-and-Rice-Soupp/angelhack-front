
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
    path: '/AddMeetingLog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/AddMeetingLog.vue') }
    ]
  },
  {
    path: '/MeetingLog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/MeetingLog.vue') }
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
