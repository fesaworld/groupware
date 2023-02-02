const page = path => () => import(`@/views/${path}`).then(m => m.default || m)

export default [
  {
    path: '/login',
    name: 'login',
    component: page('Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: page('Home.vue')
  },
  {
    path: '/articles/:id',
    name: 'articles.detail',
    component: page('ArticleDetail.vue')
  },
  {
    path: '/announcement/:id',
    name: 'announcement.detail',
    component: page('AnnouncementDetail.vue')
  },
  {
    path: '/announcementcreate',
    name: 'announcement.create',
    component: page('AnnouncementCreate.vue')
  },
  {
    path: '/messages',
    name: 'messages',
    component: page('Messages.vue')
  },
  {
    path: '/messages/:id',
    name: 'messages.detail',
    component: page('MessageDetail.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: page('Events.vue')
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: page('ThankYou.vue')
  },
  {
    path: '/thankyou/create',
    name: 'thankyou.create',
    component: page('ThankYouCreate.vue')
  },
  {
    path: '/underconstruction',
    name: 'underconstruction',
    component: page('UnderConstruction.vue')
  },
  {
    path: '/checkins',
    name: 'checkins',
    component: page('Checkins.vue')
  },
  {
    path: '/checkins/create',
    name: 'checkins.create',
    component: page('CheckinsCreate.vue')
  },
  {
    path: '/dayoff',
    name: 'dayoff',
    component: page('Dayoff/List.vue')
  },
  {
    path: '/dayoff/create',
    name: 'dayoff.create',
    component: page('Dayoff/Create.vue')
  },
  {
    path: '/dayoff/:id',
    name: 'dayoff.detail',
    component: page('Dayoff/_id.vue')
  },
  {
    path: '/feedback/create',
    name: 'feedback.create',
    component: page('FeedbackCreate.vue')
  },
  {
    path: '/users/:id',
    name: 'users.detail',
    component: page('UsersDetail.vue')
  },
  {
    path: '/profile',
    name: 'profile.detail',
    component: page('ProfileDetail.vue')
  },
  {
    path: '/profile/edit/:id',
    name: 'profile.edit',
    component: page('ProfileEdit.vue')
  },
  {
    path: '/booking',
    name: 'booking',
    component: page('Booking.vue')
  },
  {
    path: '/report',
    name: 'report.list',
    component: page('Logbook/List.vue')
  },
  {
    path: '/report/detail',
    name: 'report.detail',
    component: page('Logbook/Detail.vue')
  },
  {
    path: '/report/:action',
    name: 'report.action',
    component: page('Logbook/Action.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: page('Team.vue')
  },
  {
    path: '*',
    component: page('errors/404.vue')
  }
]
