
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
      { 
        name: "AddMeetingLog",
        path: "", 
        component: () => import('pages/AddMeetingLog.vue'),
        props: true
      }
    ]
  },
  {
    path: '/MeetingLog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/MeetingLog.vue') }
    ]
  },
  {
    path: '/ContributionStat',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/ContributionStat.vue') }
    ]
  },

  {
    path: '/CreateTools',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/CreateTools.vue') }
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
    path: '/StepIntro',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/StepIntro.vue') }
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
