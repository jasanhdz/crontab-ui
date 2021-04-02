import { getCronJob } from 'services/cronjob'
import createToken from 'services/createToken'

export default function CronJob({ cronjob }) {
  console.log(cronjob)
  return (
    <div>
      <h1>CronJob</h1>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const cronjob  = await getCronJob(token, ctx.query.id)
  
  return { props: { cronjob } }

}