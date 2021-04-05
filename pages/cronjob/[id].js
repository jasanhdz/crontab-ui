import { getCronJob } from 'services/cronjob'
import createToken from 'services/createToken'
import Wrapper from 'common/wrapper'
import CronJobForm from 'components/home/cronjob-form'

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const cronjob  = await getCronJob(token, ctx.query.id)

  return { props: { cronjob } }

}

export default function CronJob({ cronjob }) {
  return (
    <Wrapper>
      {/* <h1>CronJob</h1> */}
      <CronJobForm cronjob={cronjob} />
    </Wrapper>
  )
}