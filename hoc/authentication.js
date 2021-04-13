import { getCookies } from 'utils/cookies'
import { setCookiesSession } from 'utils/set-session'
import createToken from 'services/createToken'


function Authentication(getServerSideProps) {
  return async (context) => {
    const { user_token } = getCookies(context)
    let token = user_token
    if (!token) {
      console.log('no tenia token y fuimos a llamar a uno')
      const payload = await createToken()
      setCookiesSession(payload, context)
      token = `${payload.token_type} ${payload.access_token}`
    } else {
      console.log('tiene token')
    }  
    return await getServerSideProps(context, token)
  }
}

export default Authentication
