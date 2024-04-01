import type {
  MessageResponse,
  NewUser,
} from '@/types'
import { Endpoints } from './endpoints'
import { RequestHandler } from './requestHandler'

const messageResponseHandler = RequestHandler<MessageResponse>((endpoint, params) =>
  fetch(endpoint, params)
)

export const changePassword = async (user: { resetToken: string } & Pick<NewUser, 'password'>) => {
  const response = await messageResponseHandler(Endpoints.resetPassword, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.resetToken}`
    },
    body: JSON.stringify(user),
    method: 'PATCH'
  })

  return response
}
