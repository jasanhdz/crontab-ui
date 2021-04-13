import { useState } from 'react'
import { getWorkflow } from 'services/workflow'
import { getCookies } from 'utils/cookies'
import { updateWorkflow } from 'services/workflow'
import Authentication from 'hoc/authentication'
import Wrapper from 'common/wrapper'
import WorkFlowForm from 'workflow/workflow-form'
import Navigation from 'common/navigation'
import Error from 'pages/_error'

export const getServerSideProps = Authentication(async (ctx, token) => {
  const { statusCode, workflow } = await getWorkflow(token, ctx.query.id)
  return { props: { statusCode, workflow } }
})

export default function WorkFlow(props) {
  const { workflow, statusCode } = props
  if (statusCode) return <Error statusCode={statusCode} />
  const [state, setState] = useState(workflow)
  
  const handleSubmit = async (values) => {
    console.log(values)
    const { user_token: token } = getCookies()
    const { success, payload } = await updateWorkflow(token, state.id, values)
    if (success) {
      console.log(payload)
      setState({ ...payload })
    }
  }

  return (
    <>
      <Navigation />
      <Wrapper>
        <h1>{state.name}</h1>
        <WorkFlowForm workflow={state} onSubmit={handleSubmit} />
      </Wrapper>
    </>
  )
}