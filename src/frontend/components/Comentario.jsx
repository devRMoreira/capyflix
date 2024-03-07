export function Comentario({ avatar, username, conteudo }) {
  return (
    <div className=" flex flex-col gap-1 ml-8 text-xs text-main-white">
      <div className=" flex items-center ">
        <img src={avatar} className=" w-4 h-4 mt-1"></img>
        <div className=" ml-2">Comentário de {username}:</div>
      </div>
      <div className=" flex justify-start ml-8 font-light">{conteudo}</div>
    </div>
  );
}
