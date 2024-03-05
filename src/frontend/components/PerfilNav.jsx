export function PerfilNav({ avatar, username, comentarios, ligacoes, config }) {
  return (
    <div className=" flex w-full h-16 bg-navbar px-5">
      <div className=" w-full flex justify-between">
        <div className=" flex items-center">
          <a href="/perfil">
            <img src={avatar} alt="Avatar do Usuário" className=" pr-2"></img>
          </a>
          <div className=" font-semibold text-laranja-principal">
            {username}
          </div>
        </div>
        <div className=" flex items-center">
          <a href="/comentarios">
            <img
              src={comentarios}
              alt="Comentários do Usuário"
              className="pr-4"
            ></img>
          </a>
          <a href="/ligacoes">
            <img
              src={ligacoes}
              alt="Perfis que o usuário segue e seus seguidores"
              className="pr-2 w-8 h-6"
            ></img>
          </a>
          <a href="/configuracoes">
            <img src={config} alt="Configurações" className=" pl-1"></img>
          </a>
        </div>
      </div>
    </div>
  );
}
