import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { useRouter } from 'next/router';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const { asPath, route, pathname } = router

  if (asPath === "/" || asPath === "/registar") {
    return <div>
      <Component {...pageProps} />
    </div>
  } else {

    return <div>
      <Component {...pageProps} />
      <NavPrincipal />
    </div>
  }
}
