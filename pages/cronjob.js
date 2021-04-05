import Wrapper from 'common/wrapper'
import { getAllCronJobs } from 'services/cronjob'
import createToken from 'services/createToken'
import Table from 'home/cronjobs-list'

export default function Workflows({ cronjobs = [] }) {
  return (
    <Wrapper>
      <h1>Cron Jobs All</h1>
      <Table cronjobs={cronjobs} />
    </Wrapper>
  )
}

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const data = await getAllCronJobs(token)
  
  return { props: { cronjobs: data } }

}