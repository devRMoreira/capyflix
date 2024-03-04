import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <div>
    <Component {...pageProps} />
    <NavPrincipal />
  </div>
}
