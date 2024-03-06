import moment from "moment";
import { EpisodioSerie } from "./episodioSerie";
import Image from "next/image";

export function SerieCompleta({ serie }) {
  return (
    <div className="md:h-screen md:w-screen bg-fundo-principal text-main-white relative">
       <div>
            <Image src={serie.capa} width="100" height="100" />
            <h2>{serie.titulo}</h2>
            <h2>{serie.tituloOriginal}</h2>
            <h3>{serie.genero.map((ele, index) => index < serie.genero.length - 1 ? ele + "/" : ele)}</h3>
            <h3 className="text-main-black">Data de Lançamento: {moment(serie.dataLancamento).format('DD/MM/YYYY')}</h3>
            <p>{Object.keys(serie.temporadas).length}</p>
            <p>{serie.classificacaoEtaria}</p>
            <p>{serie.mediaAvaliacoes}</p>
        </div>

      <div>
        <h4>Sinopse</h4>
        <p>{serie.sinopse}</p>
        <h4>Elenco:</h4>
        <p>
          {serie.elenco.map((ator, i) => (
            <span key={i}>
              {ator.nome}
              {i < serie.elenco.length - 1 && " / "}
            </span>
          ))}
        </p>
        <h4>Realizador:</h4>
        <p>{serie.realizador.nome}</p>
        <div>
          {serie.temporadas.map((temporada, i) => (
            <div key={i}>
              <p>Temporada {i + 1}</p>
              {temporada.map((episodio, index2) => (
                <div><EpisodioSerie
                  key={index2}
                  numero={index2 + 1}
                  titulo={episodio.titulo}
                  descricao={episodio.descricao}
                /></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}