export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div id="page-portal" />
    </>
  )
}