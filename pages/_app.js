import "../style/index.css";
import { CookiesProvider } from "react-cookie"

//import 'bootstrap/dist/css/bootstrap.min.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />

    
  }