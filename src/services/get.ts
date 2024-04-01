import type { Task } from '@/types'
import { Endpoints } from './endpoints'
import { RequestHandler } from './requestHandler'
import { getCookie } from '@/lib/utils'
import { COOKIE_NAME } from '@/lib/enums'

const getTasksHandler = RequestHandler<Task[]>((endpoint, params) => fetch(endpoint, params))

export const getTasks = async () => {
  const token = getCookie(COOKIE_NAME.ACCESS_TOKEN)

  const response = await getTasksHandler(Endpoints.tasks, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  return response
}
