import { getCronJob } from 'services/cronjob'
import Wrapper from 'common/wrapper'
import CronJobForm from 'components/home/cronjob-form'
import { getToken } from 'utils/cookies'
import { useState } from 'react'

export async function getServerSideProps(ctx) {
  const { user_token: token, ...payload } = await getToken(ctx)
  const newToken = `${payload.token_type} ${payload.access_token}`
  const data = await getCronJob(token || newToken, ctx.query.id)
  
  return {
    props: {
      cronjob: data,
      token: newToken || null
    }
  }
}

export default function CronJob({ cronjob }) {
  const [state, setState] = useState(cronjob)
  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>CronJob</h2>
      <CronJobForm cronjob={state} setCronJob={setState} />
    </Wrapper>
  )
}