import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component { ...pageProps }/>
    </Provider>
  );
}
