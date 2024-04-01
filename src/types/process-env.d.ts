export {}
type Environment = 'development' | 'production'
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_API_URL: string
      NODE_ENV: Environment
    }
  }
}
