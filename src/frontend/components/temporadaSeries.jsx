import { EpisodioSerie } from "./episodioSerie";
import Image from "next/image";


export function TemporadaSeries({ serie }) {
    return (
        <div>
            <Image src={serie.capa} width="100" height="100" />
            <h2>{serie.titulo}</h2>
            <h2>{serie.tituloOriginal}</h2>
            <h3>{serie.genero}</h3>
            <p>{serie.temporadas}</p>
            <p>{serie.classificacaoEtaria}</p>
            <p>{serie.mediaAvaliacoes}</p>
            <div>
                <EpisodioSerie />
                <EpisodioSerie />
                <EpisodioSerie />
                <EpisodioSerie />
                <EpisodioSerie />
                <EpisodioSerie />
            </div>
        </div>
    )
}