import { ThemeProvider } from 'styled-components'
import BaseStyles from 'components/base-styles'
import theme from 'theme/theme'
import { useEffect } from 'react'
import { getCookies } from 'utils/cookies'
import { setCookiesSession } from 'utils/set-session'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const { token } = pageProps
    const { user_token } = getCookies()
    if (token && !user_token) setCookiesSession(token)
    console.log('me ejecute')
  }, [pageProps && pageProps.token])
  return (
    <ThemeProvider theme={theme}>
      <BaseStyles theme={{}} />
      <Component {...pageProps} />
      <div id="page-portal" />
    </ThemeProvider>
  )
}