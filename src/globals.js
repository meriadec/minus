const { NODE_ENV } = process.env

export const __BROWSER__ = false
export const __ENV__ = NODE_ENV || 'development'
export const __DEV__ = __ENV__ === 'development'
export const __PROD__ = __ENV__ === 'production'

export const __APIURL__ = __DEV__ ? 'http://localhost:3001' : 'http://localhost:3000/api'
