import { EpisodioSerie } from "./episodioSerie";
import { SerieCard } from "./serieCard";

export function SerieCompleta({ serie }) {
  return (
    <div>
      <SerieCard serie={serie} />

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