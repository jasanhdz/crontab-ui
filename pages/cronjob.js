import Wrapper from 'common/wrapper'
import { getAllCronJobs } from 'services/cronjob'
// import Table from 'home/cronjobs-list'
import Table from 'common/table/'
import { getToken } from 'utils/cookies'
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
  const { name, description, scheduling, id, updated_at, created_at } = cronjobs[0]
  const headCells = Object
    .keys({ name, description, scheduling, id, updated_at, created_at } )
    .map(key => ({ id: key, numeric: isNaN(key) ? false : true, disablePadding: true, label: capitalizeFirstLetter(key) }))
  
  return (
    <Wrapper>
      <h1>Cron Jobs All</h1>
      <Table items={cronjobs} headCells={headCells} title="CronJobs" />
    </Wrapper>
  )
}