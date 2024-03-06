export function EpisodioSerie({ numero, titulo, descricao }) {
  return (
    <div className="text-main-white text-xs border border-laranja-principal rounded-xl w-48 mx-1 my-2">
      <p className="mb-1">Episódio: {numero} - {titulo} </p>
      <p className="text-xxs">{descricao}</p>
    </div>
  );
}


