import '../styles/globals.scss';

// adding function to track Performance metrics
// will set up later to send to Vercel
// export function reportWebVitals(metric) {
//   if (metric.label === 'web-vital') {
//     console.log(metric);
//   } else {
//     console.log(metric);
//   }
// }

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
