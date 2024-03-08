import moment from "moment/moment";

export function HomeFilmeSerieResumo({ conteudo }) {
  return (
    <div className="p-4 ml-4 mr-4 mb-2 md:mt-4 md:ml-2 md:mr-2 md:mb-2 text-sm text-main-white border-2 border-laranja-principal rounded-lg flex">
      <div className="sm:w-1/2 ">
        <img src={conteudo.capa} className="h-36 w-25 object-cover"></img>
      </div>
      <div className="flex flex-col justify-center gap-1 pl-4 sm:w-1/2">
        <h2 className="font-bold">{conteudo.titulo}</h2>
        <div>
          {conteudo.generos.map((ele, index) =>
            index < conteudo.generos.length - 1 ? <span>{ele} / </span> : <span>{ele}</span>
          )}
        </div>

        <div>{conteudo.duracao}m</div>
        <div>{conteudo.classificacaoEtaria}</div>
        <span>{String(moment(conteudo.dataLancamento).format("DD/MM/YYYY"))}</span>
      </div>
    </div>
  );
}
