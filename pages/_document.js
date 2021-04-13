import { ServerStyleSheet as ServerStyleSheetStyledComponents } from 'styled-components'
import { ServerStyleSheets as ServerStyleSheetMaterialUI } from '@material-ui/core'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerPortal } from '@jesstelford/react-portal-universal/server'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#3f51b5" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap" rel="stylesheet" />  
          <link href="https://fonts.googleapis.com/css?family=Anton" rel="stylesheet" />  
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const portals = new ServerPortal()
  const styledComponentsSheet = new ServerStyleSheetStyledComponents()
  const materialUISheet = new ServerStyleSheetMaterialUI()
  const originalRenderPage = ctx.renderPage
  try {
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => styledComponentsSheet.collectStyles(materialUISheet.collect(portals.collectPortals(<App {...props} />)))
    })
    const { html, ...initialProps } = await Document.getInitialProps(ctx)
    const htmlWithPortals = portals.appendUniversalPortals(html)
    return {
      ...initialProps,
      html: htmlWithPortals,
      styles: (
        <>
          {initialProps.styles}
          {materialUISheet.getStyleElement()}
          {styledComponentsSheet.getStyleElement()}
        </>
      )
    }
  } finally {
    styledComponentsSheet.seal()
  }
}
