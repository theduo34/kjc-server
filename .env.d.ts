declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string,
      PORT: string,
      NODE_ENV: 'development' | 'production',
      JWT_PRIVATE_KEY: string
    }
  }
}
export {}
