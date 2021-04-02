import { getWorkflow } from 'services/workflow'
import createToken from 'services/createToken'

export default function WorkFlow({ workflow }) {
  console.log(workflow)
  return (
    <div>
      <h1>Worflow</h1>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const workflow  = await getWorkflow(token, ctx.query.id)
  
  return { props: { workflow } }

}