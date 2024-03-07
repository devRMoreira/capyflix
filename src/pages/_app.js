import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import { create } from "zustand";

export const userStore = create((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user: user }))
}))

export const toastSuccess = (string) => toast.success(string)
export const toastError = (string) => toast.error(string)

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const { asPath, route, pathname } = router



  if (asPath === "/" || asPath === "/registar") {
    return <div>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  } else {

    return <div>
      <Component {...pageProps} />
      <ToastContainer />
      <NavPrincipal />
    </div>
  }
}
