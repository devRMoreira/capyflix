export function PerfilNav({ avatar, username, comentarios, ligacoes, config }) {
  return (
    <div className=" flex w-full h-20 bg-navbar px-20">
      <div className=" w-full flex justify-between">
        <div className=" flex items-center">
          <div>
            <img src={avatar} alt="Avatar do Usuário" className=" pr-2"></img>
          </div>
          <div className=" font-semibold text-laranja-principal">
            {username}
          </div>
        </div>
        <div className=" flex items-center">
          <div>
            <img
              src={comentarios}
              alt="Comentários do Usuário"
              className="pr-2"
            ></img>
          </div>
          <div>
            <img
              src={ligacoes}
              alt="Perfis que o usuário segue e seus seguidores"
              className="pr-2"
            ></img>
          </div>
          <div>
            <img src={config} alt="Configurações" className=""></img>
          </div>
        </div>
      </div>
    </div>
  );
}
