export function Comentario({ comentario }) {

  return (
    <div className=" flex flex-col gap-1 ml-8 text-xs text-main-white">
      <div className=" flex items-center ">
        <img src={comentario.imagemPerfil} className=" w-4 h-4 mt-1" />
        <div className=" ml-2">Comentário de {comentario.nome}:</div>
      </div>
      <div className=" flex justify-start ml-8 font-light">{comentario.comentario}             <span className="pl-3">Nota: {comentario.avaliacao}</span> </div>

    </div>
  );
}
