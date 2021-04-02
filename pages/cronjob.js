import Wrapper from 'common/wrapper'
import { getAllCronJobs } from 'services/cronjob'
import createToken from 'services/createToken'

export default function Workflows({ workflows = [] }) {
  console.log(workflows)
  return (
    <Wrapper>
      <h1>Cron Jobs All</h1>
    </Wrapper>
  )
}

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const data = await getAllCronJobs(token)
  
  return { props: { workflows: data } }

}