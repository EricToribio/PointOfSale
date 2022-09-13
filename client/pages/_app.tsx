import '../styles/globals.css'
import '../styles/mainTable.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/modal.scss';
import '../styles/workOrderForm.scss';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
