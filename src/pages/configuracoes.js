import { Botao } from "@/frontend/components/Botao";
import { useState, useEffect } from "react";
import { userStore } from "./_app";
import { togglePrivado } from "@/frontend/services/utilizador";
import { toast } from "react-toastify";
import Link from "next/link";
import { Router, useRouter } from "next/router";

export default function configuracoes() {
  const { userLogado, setUserLogado } = userStore((state) => state)
  const [isToggled, setIsToggled] = useState(userLogado.privado);
  const [desativar, setDesativar] = useState(false)
  const router = useRouter()


  async function handleClick(booleano) {

    setDesativar(true)
    const res = await togglePrivado(!booleano, userLogado._id)

    if (res.ok) {
      setUserLogado({
        ...userLogado,
        privado: !booleano
      })

      toast.success("Alterado com sucesso.")
      toggleImage()
    } else {
      toast.error("Algo correu mal!")
    }


    setTimeout(() => {
      setDesativar(false);
    }, 500);

  }

  function handleLogout() {
    setUserLogado({})
    router.push("/")
    toast.success("Logout com sucesso.")
  }

  const toggleImage = () => {
    setIsToggled(ps => !ps);
  };

  useEffect(() => {

  }, [userLogado])

  return (
    <div className="flex flex-col md:max-w-96 min-h-screen h-full bg-fundo-principal">
      <Link href="/perfil/user">
        <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
      </Link>
      <button
        onClick={() => handleClick(isToggled)}
        disabled={desativar}
        className=" flex justify-between  mt-12 mx-6 text-main-white border-b border-borda-cinza"
      >
        Perfil Privado
        <img src={`/icones/toggle-${isToggled ? "on" : "off"}.png`}
          className="mb-3" />

      </button>
      <a
        href="/"
        className=" flex justify-between mt-10 mx-6 text-main-white border-b border-borda-cinza"
      >
        Alterar Foto de Perfil
        <img src="/icones/avatar.png" className=" mb-6"></img>
      </a>
      <a
        href="/"
        className=" flex justify-between  mt-10 mx-6 text-main-white border-b border-borda-cinza"
      >
        Alterar senha
        <img src="/icones/key.png" className=" w-7 h-7 mb-6"></img>
      </a>
      <a
        href="/termos"
        className=" flex justify-between mt-10 mx-6 text-main-white border-b border-borda-cinza"
      >
        Termos de Utilização
        <img src="/icones/termos.png" className="mb-6"></img>
      </a>
      <a
        href="/privacidade"
        className=" flex justify-between  mt-10 mx-6 text-main-white "
      >
        Privacidade
        <img src="/icones/privacidade.png" className="mb-3"></img>
      </a>

      <div className=" flex justify-center mt-20 mb-24" onClick={handleLogout}>
        <Botao title="LOGOUT" ></Botao>
      </div>
    </div>
  );
}
