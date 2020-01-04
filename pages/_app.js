import NextApp from 'next/app'

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    }
  }

  render() {
    const { pageProps, Component } = this.props


    return (
      <Component {...pageProps} />
    )
  }
}

export default App