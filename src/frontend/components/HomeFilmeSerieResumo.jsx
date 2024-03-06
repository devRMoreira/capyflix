export function HomeFilmeSerieResumo({ filme }) {
  return (
    <div className="p-4 text-sm text-main-white border-2 border-laranja-principal rounded-lg flex">
      <div className="sm:w-1/2 ">
        <img src={filme.capa} className="w-15 h-40 sm:w-full"></img>
      </div>
      <div className="flex flex-col justify-center gap-1 pl-4 sm:w-1/2">
        <h2 className="font-bold">{filme.titulo}</h2>
        <div>
          {" "}
          {filme.genero.map((ele, index) =>
            index < filme.genero.length - 1 ? ele + " / " : ele
          )}
        </div>

        <div>{filme.duracao}m</div>
        <div>{filme.classificacaoEtaria}</div>
      </div>
    </div>
  );
}
