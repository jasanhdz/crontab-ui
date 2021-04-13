import Cookies from 'cookies'

export function setCookiesSession(payload, ctx) {
  const cookies = ctx ? new Cookies(ctx.req, ctx.res) : new Cookies()
  const { token_type, access_token, expires_in } = payload
  const expirationToken = new Date(new Date().setSeconds(expires_in))
  const options = { expires: expirationToken, path: '/', httpOnly: false }
  cookies.set('user_token', `${token_type} ${access_token}`, options)

  console.log('isServer: ', Boolean(ctx))
}

export function removeSession() {
  const cookies = new Cookies()
  cookies.remove('user_token', { path: '/' })
  document.location.href = '/'
}