import 'isomorphic-fetch'
import { SECRET, CLIENT_ID, BASE_API_URL } from 'constants/environment'

async function createToken() {
  const res = await fetch(`${BASE_API_URL}/oauth/token`, {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${SECRET}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  })
  const data = await res.json()
  return data
}

export default createToken