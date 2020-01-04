import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

      const initailProps = await Document.getInitialProps(ctx)

      return {
        ...initailProps,
        styles: (
          <>
            {initailProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }

    } finally {
      sheet.seal()
    }
  }
}