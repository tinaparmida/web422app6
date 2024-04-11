import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import RouteGuard from '@/components/RouteGuard';


function MyApp({ Component, pageProps }) {
  return (
    <>
       <Layout>
<RouteGuard>      
          <Component {...pageProps} />
        </RouteGuard>
      </Layout>
    </>
  );
}

export default MyApp;
