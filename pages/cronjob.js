import Wrapper from 'common/wrapper'
import { getAllCronJobs } from 'services/cronjob'
import Table from 'common/table/'
import { getToken } from 'utils/cookies'
import { capitalizeFirstLetter, createData } from 'utils/util'
import { getTimeAgo } from 'utils/get-date'

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
    .keys({ name, description, scheduling, id, updated_at, created_at, action: '' } )
    .map(key => ({ id: key, numeric: isNaN(key) ? false : true, disablePadding: true, label: capitalizeFirstLetter(key) }))
  const rows = cronjobs.map(item => {
    return createData(item.name, item.description, item.scheduling, Number(item.id), getTimeAgo(new Date(item.updated_at).getTime()), getTimeAgo(new Date(item.created_at).getTime()))
  })
  return (
    <Wrapper>
      <h1>Cron Jobs All</h1>
      <Table rows={rows} headCells={headCells} title="CronJobs" />
    </Wrapper>
  )
}