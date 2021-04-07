import Wrapper from 'common/wrapper'
import { getAllCronJobs } from 'services/cronjob'
import Table from 'home/cronjobs-list'
import { getToken } from 'utils/cookies'

export async function getServerSideProps(ctx) {
  const { user_token: token, ...payload } = await getToken(ctx)
  const newToken = `${payload.token_type} ${payload.access_token}`
  const data = await getAllCronJobs(token ? token : newToken)
  
  return {
    props: {
      cronjobs: data,
      token: newToken ? newToken : null
    }
  } 
}

export default function Workflows({ cronjobs = [] }) {
  return (
    <Wrapper>
      <h1>Cron Jobs All</h1>
      <Table cronjobs={cronjobs} />
    </Wrapper>
  )
}