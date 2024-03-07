import Link from "next/link";
import React from "react";

export function NavPrincipal({ home, pesquisar, perfil }) {
  return (
    <div className=" md:max-w-96 mx-auto fixed bottom-0 flex w-full h-12 bg-navbar px-5">
      <div className=" w-full flex justify-around">
        <div className=" flex items-center">
          <Link href="/home">
            <img src="/icones/Home.png" alt="Home" className="  pr-24"></img>
          </Link>
          <Link href="/pesquisa">
            <img
              src="/icones/Search.png"
              alt="Pesquisar"
              className=" pr-24"
            ></img>
          </Link>
          <Link href="/perfil/user">
            <img src="/icones/avatar.png" alt="Perfil" className=""></img>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default React.memo(NavPrincipal)