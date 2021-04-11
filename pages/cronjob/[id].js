import { getCronJob } from 'services/cronjob'
import { getAllWorkflows } from 'services/workflow'
import Wrapper from 'common/wrapper'
import CronJobForm from 'components/home/cronjob-form'
import { getToken } from 'utils/cookies'
import { useState } from 'react'

export async function getServerSideProps(ctx) {
  const { user_token: token, ...payload } = await getToken(ctx)
  const newToken = `${payload.token_type} ${payload.access_token}`
  const cronjob = await getCronJob(token || newToken, ctx.query.id)
  const workflows = await getAllWorkflows(token || newToken)
  return {
    props: {
      cronjob,
      workflows,
      token: payload || null
    }
  }
}

export default function CronJob(props) {
  const { cronjob, workflows } = props
  const [state, setState] = useState(cronjob)
  const [ids] = useState(workflows.map(work => ({ value: work.id, tile: work.id })))
  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>CronJob</h2>
      <CronJobForm cronjob={state} setCronJob={setState} workflows={ids} />
    </Wrapper>
  )
}