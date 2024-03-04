export function NavPrincipal({ home, pesquisar, perfil }) {
  return (
    <div className=" md:max-w-96 mx-auto fixed bottom-0 flex w-full h-12 bg-navbar px-5">
      <div className=" w-full flex justify-around">
        <div className=" flex items-center">
          <a href="/">
            <img src={home} alt="Home" className="  pr-24"></img>
          </a>
          <a href="/">
            <img src={pesquisar} alt="Pesquisar" className=" pr-24"></img>
          </a>
          <a href="/">
            <img src={perfil} alt="Perfil" className=""></img>
          </a>
        </div>
      </div>
    </div>
  );
}
