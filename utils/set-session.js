import Cookies from 'universal-cookie'

export function setCookiesSession(payload) {
  console.log('payload: ', payload)
  const cookies = new Cookies()
  const date = new Date()
  const { token_type, access_token, expires_in } = payload
  const expirationToken = new Date(date.setSeconds(expires_in))
  console.log('expirationToken: ', expirationToken)
  cookies.set('user_token', `${token_type} ${access_token}`, { expires: expirationToken, path: '/' })
}

export function removeSession() {
  const cookies = new Cookies()
  cookies.remove('user_token', { path: '/' })
  document.location.href = '/'
}