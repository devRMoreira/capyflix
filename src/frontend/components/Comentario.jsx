import { useRouter } from "next/router";

export function Comentario({ comentario }) {

  const router = useRouter()

  function handleClick() {

    router.push(`/perfil/${comentario.utilizador}`)

  }

  return (
    <div className=" flex flex-col ml-4 text-xs text-main-white ">
      <div className=" flex ">
        <a onClick={handleClick}>
          <img src={comentario.imagemPerfil} alt="Avatar do utilizador" className=" w-5 h-5 mt-1" />
          <div className=" ml-6">Comentário de {comentario.nome}:</div>
        </a>
      </div>
<div className=" flex justify-start ml-8 font-light">{comentario.comentario}<span className="pl-3">Nota: {comentario.avaliacao}</span> </div>
   
    </div>
  );
}
