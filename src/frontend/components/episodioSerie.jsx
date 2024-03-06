export function EpisodioSerie({ numero, titulo, descricao }) {
  return (
   <div className="container mx-auto">
    <div className="flex flex-wrap">
   <div className="bg-fundo-principal text-main-white text-xs justify-normal border border-laranja-principal rounded-xl w-48 ">
      <p className="text-xs mb-1">Episódio: {numero} - {titulo} </p>
      <p className="text-xxs">{descricao}</p>
    </div>
    </div>
    </div>
  );
}


