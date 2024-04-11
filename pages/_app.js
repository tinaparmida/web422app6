import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import RouteGuard from '@/components/RouteGuard';
import { SWRConfig } from 'swr';


function MyApp({ Component, pageProps }) {
  return (
    <>
       <Layout>
<RouteGuard>   
<SWRConfig value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}>
   
          <Component {...pageProps} />
          </SWRConfig>
        </RouteGuard>
      </Layout>
    </>
  );
}

export default MyApp;
