import { createRouter, createWebHistory } from 'vue-router'

export const Routes = {
  logIn: '/log-in',
  verify: '/verify',
  signUp: '/sign-up',
  home: '/',
  invite: '/invite',
  invitation: '/invitation',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.home,
      name: 'home',
      component: import('@/views/HomeView.vue')
    },
    {
      path: Routes.logIn,
      name: 'log-in',
      component: import('@/views/LogInView.vue')
    },
    {
      path: Routes.verify + '/:token',
      name: 'verify',
      component: () => import('@/views/VerifyAccountView.vue')
    },
    {
      path: Routes.signUp,
      name: 'sign-up',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: Routes.invite,
      name: 'invite',
      component: import('@/views/InviteView.vue')
    },
    {
      path: Routes.invitation + '/:token',
      name: 'invitation',
      component: import('@/views/InvitationView.vue')
    },
    {
      path: Routes.forgotPassword,
      name: 'forgot-password',
      component: import('@/views/ForgotPasswordView.vue')
    },
    {
      path: Routes.resetPassword + '/:token',
      name: 'reset-password',
      component: () => import('@/views/ResetPasswordView.vue')
    },
  ]
})

export default router
