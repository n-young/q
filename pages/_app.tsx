import React from "react"
import '../styles/normalize.css'
import '../styles/globals.css'

interface MyAppProps {
    Component: any
    pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />
}

export default MyApp
