export function EpisodioSerie({ numero, titulo, descricao }) {
  return (
    <div className="text-main-white text-xs border border-laranja-principal rounded-xl w-44 h-48 mx-1 overflow-hidden my-2">
      <p className="mb-1 p-1">
        Episódio: {numero} - {titulo}{" "}
      </p>
      <p className="text-xxs text-justify-center w-full h-full p-1">
        {descricao}
      </p>
    </div>
  );
}
