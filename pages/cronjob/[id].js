import { useState } from 'react'
import { getCronJob, updateCronJob } from 'services/cronjob'
import { getAllWorkflows } from 'services/workflow'
import { getCookies } from 'utils/cookies'
import { createSchedulingOfValues } from 'utils/util'
import Authentication from 'hoc/authentication'
import Wrapper from 'common/wrapper'
import CronJobForm from 'cronjob/cronjob-form'
import Navigation from 'common/navigation'
import Error from 'pages/_error'

export const getServerSideProps = Authentication(async (ctx, token) => {
  const { cronjob, statusCode } = await getCronJob(token, ctx.query.id)
  const { workflows } = await getAllWorkflows(token)

  return { props: { statusCode, cronjob, workflows } }
})

export default function CronJob(props) {
  const { cronjob, workflows, statusCode } = props
  if (statusCode) return <Error statusCode={statusCode} />
  const [state, setState] = useState(cronjob)
  const ids = workflows.map(work => ({ value: work.id, tile: work.id }))
  
  const handleSubmit = async values => {
    const { name, description, workflow_id } = values
    const scheduling = createSchedulingOfValues(values)
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
    <>
      <Navigation />
      <Wrapper>
        <h2 style={{ marginTop: 0 }}>CronJob</h2>
        <CronJobForm  cronjob={state} workflows={ids} handleOnSubmit={handleSubmit}  />
      </Wrapper>
    </>
  )
}