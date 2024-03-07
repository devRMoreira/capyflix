import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { create } from "zustand";
import { ToastContainer, toast } from "react-toastify";

export const toastSuccess = (string) => toast.success(string)
export const toastError = (string) => toast.error(string)

export const userStore = create((set) => ({
  userLogado: {
    "_id": "65e5a023de0f619624348e7a",
    "nome": "Gandalf, O Grande",
    "conteudoVisto": [],
    "conteudoPorVer": [],
    "conteudoFavorito": [
        {
            "tipo": "serie",
            "id": "65de739fe8cef6ce35e6ec30"
        }
    ],
    "seguidores": [
        "65e5a01cde0f619624348e79"
    ],
    "quemSegue": [],
    "privado": false,
    "estatisticas": {
        "filmes": {
            "quantidade": 0,
            "tempo": 0,
            "generos": []
        },
        "series": {
            "quantidade": 0,
            "tempo": 0,
            "generos": []
        }
    },
    "imagemPerfil": "https://i.imgur.com/eOtKaB8.jpeg",
    "dataRegisto": 1709547555398
},
  setUserLogado: (user) => set(() => ({ userLogado: user }))
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
