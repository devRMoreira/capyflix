export function EpisodioSerie({ numero, titulo, descricao }) {
  return (
    <div className="bg-fundo-principal text-main-white text-xs justify-normal border border-laranja-principal rounded-xl w-48 ">
      <p className="text-sm mb-1">Episódio: {numero} - {titulo} </p>
      <p className="">{descricao}</p>
    </div>
  );
}
