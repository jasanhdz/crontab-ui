import Wrapper from 'common/wrapper'

export default function Index({ workflows = [] }) {
  console.log(workflows)
  return (
    <Wrapper>
      <h1>Hello world</h1>
    </Wrapper>
  )
}