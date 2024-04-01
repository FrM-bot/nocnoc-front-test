import type { AccessToken, CreateAdminPasskey, MessageResponse, NewTask, NewUser, Task } from '@/types'
import { Endpoints } from './endpoints'
import { RequestHandler } from './requestHandler'
import { getCookie } from '@/lib/utils'
import { COOKIE_NAME } from '@/lib/enums'

type CreateTaskResponse = {
  task: Task,
  files: string[]
}

const messageResponseHandler = RequestHandler<MessageResponse>((endpoint, params) => fetch(endpoint, params))

const logInHandler = RequestHandler<MessageResponse & AccessToken>((endpoint, params) => fetch(endpoint, params))

const createTaskHandler = RequestHandler<CreateTaskResponse>((endpoint, params) => fetch(endpoint, params))

export const signUpAdmin = async (user: NewUser & CreateAdminPasskey) => {
  const response = await messageResponseHandler(Endpoints.signUp, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
    method: 'POST'
  })

  return response
}

export const verifyAdmin = async (user: { signUpToken: string } & Pick<NewUser, 'password'>) => {
  const response = await messageResponseHandler(Endpoints.verify, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.signUpToken}`
    },
    body: JSON.stringify({ password: user.password }),
    method: 'POST'
  })

  return response
}

export const logIn = async (user: NewUser) => {
  const response = await logInHandler(Endpoints.logIn, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
    method: 'POST'
  })

  return response
}

export const inviteUser = async (user: Pick<NewUser, 'email'>) => {
  const token = getCookie(COOKIE_NAME.ACCESS_TOKEN)
  const response = await messageResponseHandler(Endpoints.invite, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user),
    method: 'POST'
  })

  return response
}

export const acceptInvitation = async (user: { invitationToken: string } & Pick<NewUser, 'password'>) => {
  const response = await messageResponseHandler(Endpoints.acceptInvitation, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.invitationToken}`
    },
    body: JSON.stringify(user),
    method: 'POST'
  })

  return response
}

export const createTask = async (task: NewTask) => {
  const token = getCookie(COOKIE_NAME.ACCESS_TOKEN)

  const body = new FormData()

  body.append('title', task.title)
  body.append('description', task.description)

  task?.files?.length > 0 && task?.files?.forEach(file => {
    console.log(file, 'Post')
    body.append('files[]', file)
  })

  const response = await createTaskHandler(Endpoints.tasks, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    body,
    method: 'POST'
  })

  return response
}

export const forgotPassword = async (user: Pick<NewUser, 'email'>) => {
  const response = await messageResponseHandler(Endpoints.forgotPassword, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
    method: 'POST'
  })

  return response
}