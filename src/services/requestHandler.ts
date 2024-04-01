import { STATUS_CODE } from '@/lib/enums'
type BaseRequest = (
  endpoint: string | URL | Request,
  params?: RequestInit | undefined
) => Promise<Response>

type SuccessResponse<V> = {
  code: STATUS_CODE.SUCCESS
  data: V
}

type ErrorResponse = {
  code: STATUS_CODE.ERROR
  error: string
}

type MessageResponse = {
  code: STATUS_CODE.MESSAGE
  message: string
}

type BaseResponse<V> = Promise<SuccessResponse<V> | ErrorResponse | MessageResponse>

export const RequestHandler =
  <R>(request: BaseRequest) =>
  async (endpoint: string | URL | Request, params?: RequestInit | undefined): BaseResponse<R> => {
    try {
      const response = await request(endpoint, params)
      const json = await response.json()

      if (response.status === 500) {
        const message = json.error as unknown as string
        return {
          code: STATUS_CODE.ERROR,
          error: message || 'Unknown error'
        }
      }

      if (response.status !== 200 || !json?.data) {
        const message = (json.message || json.error) as unknown as string
        return {
          code: STATUS_CODE.MESSAGE,
          message: message || 'Unknown error'
        }
      }

      return {
        code: STATUS_CODE.SUCCESS,
        data: json.data as R
      }
    } catch (error: unknown) {
      console.error(error)
      return {
        code: STATUS_CODE.ERROR,
        error: 'Something went wrong'
      }
    }
  }
