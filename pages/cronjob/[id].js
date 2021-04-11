import { getCronJob, updateCronJob } from 'services/cronjob'
import { getAllWorkflows } from 'services/workflow'
import Wrapper from 'common/wrapper'
import CronJobForm from 'components/home/cronjob-form'
import { getCookies, getToken } from 'utils/cookies'
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
  console.log(cronjob)
  const handleSubmit = async values => {
    const { seconds, minutes, hours, days, month, year, name, description, workflow_id } = values
    const scheduling = `${seconds.value || '*'} ${minutes.value || '*'} ${hours.value || '*'} ${days.OF_MONTH.value || '?'} ${month.value} ${days.OF_WEEKDAY.value || '*'} ${year.value || '*'}`
    console.log(scheduling)
    const { user_token: token } = getCookies()
    const data = {
      name,
      description,
      workflow_id,
      scheduling
    }
    const { payload } = await updateCronJob(token, state.id, data)
    console.log(payload)
    setState({ ...payload })
  }
  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>CronJob</h2>
      <CronJobForm  cronjob={state} workflows={ids} handleOnSubmit={handleSubmit}  />
    </Wrapper>
  )
}