export function EpisodioSerie({ numero, titulo, descricao }) {
  return (
    <div className="text-main-white text-xs border border-laranja-principal rounded-xl w-40 h-40 mx-1 overflow-hidden my-2">
      <p className="mb-1">Episódio: {numero} - {titulo} </p>
      <p className="text-xxs text-justify-center">{descricao}</p>
    </div>
  );
}


