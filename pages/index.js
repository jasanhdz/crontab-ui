import Wrapper from 'common/wrapper'
import { getAllWorkflows } from 'services/workflow'
import createToken from 'services/createToken'

function Index({ workflows = [] }) {
  console.log(workflows)
  return (
    <Wrapper>
      <h1>Hello world</h1>
    </Wrapper>
  )
}

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const data = await getAllWorkflows(token)
  
  return { props: { workflows: data } }

}

export default Index
