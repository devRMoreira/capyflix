import { Botao } from "@/frontend/components/Botao";
import { useState, useEffect } from "react";

export default function configuracoes() {
  const [istToggled, setIsToggled] = useState(false);

  const toggleImage = () => {
    setIsToggled(!istToggled);
  };

  return (
    <div className="flex flex-col md:max-w-96 min-h-screen h-full bg-fundo-principal">
      <a href="/perfil">
        <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
      </a>
      <button
        onClick={toggleImage}
        className=" flex justify-between  mt-12 mx-6 text-main-white border-b border-borda-cinza"
      >
        Perfil Privado
        {istToggled ? (
          <img src="/icones/toggle-on.png" className=" mb-3"></img>
        ) : (
          <img src="/icones/toggle-off.png" className=" mb-3"></img>
        )}
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

      <div className=" flex justify-center mt-20 mb-24">
        <Botao title="LOGOUT"></Botao>
      </div>
    </div>
  );
}
