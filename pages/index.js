export default function Index() {
  return <h1>Hello world</h1>
}

export function getServerSideProps(ctx) {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/cronjob' })
    ctx.res.end()
  }

  return { props: {} }
}