export type NewUser = {
  email: string
  password: string
}

export type CreateAdminPasskey = {
  clientPassKey: string
}

export type AccessToken = {
  accessToken: string
  expires: number
}

export type NewTask = {
  title: string
  description: string
  files: File[] | []
}

type TaskFile = {
  url: string
  originalName: string
}

export type Task = Pick<NewTask, 'title' | 'description'> & {
  id: string
  files: TaskFile[]
  updatedAt: Date
  createdAt: Date
}

export type MessageResponse = {
  message: string
}
