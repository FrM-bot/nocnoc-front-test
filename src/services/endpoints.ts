import { apiUrl } from '@/lib/env'

export const Endpoints = {
  signUp: apiUrl + '/sign-up',
  logIn: apiUrl + '/log-in',
  verify: apiUrl + '/verify',
  invite: apiUrl + '/invite',
  acceptInvitation: apiUrl + '/accept-invitation',
  tasks: apiUrl + '/tasks',
  forgotPassword: apiUrl + '/forgot-password',
  resetPassword: apiUrl + '/reset-password',
}
