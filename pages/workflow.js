import Wrapper from 'common/wrapper'
import { getAllWorkflows } from 'services/workflow'
import createToken from 'services/createToken'

export default function Workflows({ workflows = [] }) {
  console.log(workflows)
  return (
    <Wrapper>
      <h1>WorkFlows all</h1>
    </Wrapper>
  )
}

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const data = await getAllWorkflows(token)
  
  return { props: { workflows: data } }

}