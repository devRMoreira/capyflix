import moment from "moment";
import { EpisodioSerie } from "./episodioSerie";
import { SerieCard } from "./serieCard";

export function SerieCompleta({ serie }) {
    return (
        <div>
            <div>
                <SerieCard serie={ serie } />
            </div>
            <div>
                <h4>Sinopse</h4>
                <p>{serie.sinopse}</p>
                <h4>Elenco:</h4>
                <p>{serie.elenco.nome}</p>
                <h4>Realizador:</h4>
                <p>{serie.realizador.nome}</p>
                <div>
                    {serie.temporadas.map((ele, i) => <p> Temporada {i + 1}</p>)}

                    {serie.temporadas.map((ele, i) => ele.map((ele, i) => <EpisodioSerie numero={i + 1} titulo={ele.titulo} descricao={ele.descricao} />))}
                </div>
            </div>
        </div>
    )
}