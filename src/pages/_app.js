import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { create } from "zustand";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const toastSuccess = (string) => toast.success(string)
export const toastError = (string) => toast.error(string)

export const userStore = create((set) => ({
  userLogado: {
    "_id": "65e5a023de0f619624348e7a",
    "nome": "Gandalf, O Grande",
    "conteudoVisto": [
      {
        "tipo": "filme",
        "id": "65de739be8cef6ce35e6ec23",
        "visualizado": 1709669104047
      },
      {
        "tipo": "serie",
        "id": "65de739fe8cef6ce35e6ec2d",
        "visualizado": 1709635083584
      }
    ],
    "conteudoPorVer": [
      {
        "tipo": "serie",
        "id": "65de739fe8cef6ce35e6ec2d",
        "episodiosVistos": [
          4
        ]
      },
      {
        "tipo": "filme",
        "id": "65de739be8cef6ce35e6ec23"
      },
      {
        "tipo": "serie",
        "id": "65de739fe8cef6ce35e6ec30",
        "episodiosVistos": []
      },
      {
        "tipo": "serie",
        "id": "65de739fe8cef6ce35e6ec2f",
        "episodiosVistos": []
      },
      {
        "tipo": "serie",
        "id": "65de739fe8cef6ce35e6ec2e",
        "episodiosVistos": []
      }
    ],
    "conteudoFavorito": [
      {
        "tipo": "filme",
        "id": "65de739be8cef6ce35e6ec23"
      },
      {
        "tipo": "serie",
        "id": "65de739fe8cef6ce35e6ec2d"
      }
    ],
    "seguidores": [
      "65e5a01cde0f619624348e79"
    ],
    "quemSegue": [],
    "privado": true,
    "estatisticas": {
      "filmes": {
        "quantidade": 1,
        "tempo": 114,
        "generos": ["Romance", "Aventura", "Comédia", "Drama", "Fantasia"]
      },
      "series": {
        "quantidade": 1,
        "tempo": 72,
        "generos": ["Comédia", "Musical"]
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
      <ToastContainer autoClose={2500} />
      <Component {...pageProps} />
    </div>
  } else {

    return <div>
      <ToastContainer autoClose={2500} />
      <Component {...pageProps} />
      <NavPrincipal />
      <div className=" h-[35px]" />
    </div>
  }
}
