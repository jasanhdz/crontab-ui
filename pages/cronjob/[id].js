import { useState } from 'react'
import { getCronJob, updateCronJob } from 'services/cronjob'
import { getAllWorkflows } from 'services/workflow'
import { getCookies, getToken } from 'utils/cookies'
import { createSchedulingOfValues } from 'utils/util'
import Wrapper from 'common/wrapper'
import CronJobForm from 'components/home/cronjob-form'

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
  const ids = workflows.map(work => ({ value: work.id, tile: work.id }))
  
  const handleSubmit = async values => {
    const { name, description, workflow_id } = values
    const scheduling = createSchedulingOfValues(values)
    console.log(scheduling)
    // const { user_token: token } = getCookies()
    // const data = {
    //   name,
    //   description,
    //   workflow_id,
    //   scheduling
    // }
    // const { payload } = await updateCronJob(token, state.id, data)
    // console.log(payload)
    // setState({ ...payload })
  }

  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>CronJob</h2>
      <CronJobForm  cronjob={state} workflows={ids} handleOnSubmit={handleSubmit}  />
    </Wrapper>
  )
}