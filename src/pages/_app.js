import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { create } from "zustand";
import { ToastContainer, toast } from "react-toastify";

export const toastSuccess = (string) => toast.success(string)
export const toastError = (string) => toast.error(string)

export const userStore = create((set) => ({
  user: {},
  setUser: (args) => set(() => ({ user: args }))
}))


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const { asPath, route, pathname } = router



  if (asPath === "/" || asPath === "/registar") {
    return <div>
      <Component {...pageProps} />
      <ToastContainer autoClose={2500} />
    </div>
  } else {

    return <div>
      <Component {...pageProps} />
      <ToastContainer />
      <NavPrincipal />
      <div className=" h-[35px]" />
    </div>
  }
}
