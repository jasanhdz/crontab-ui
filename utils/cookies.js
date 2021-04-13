import Cookies from 'universal-cookie'

export function getCookies(ctx) {
  if (ctx) {
    const cookies = new Cookies(ctx.req.headers.cookie)
    return cookies.getAll()
  }
  const cookies = new Cookies()
  return cookies.getAll()
} 