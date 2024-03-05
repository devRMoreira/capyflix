import { EpisodioSerie } from "./episodioSerie";
import Image from "next/image";
import { SerieCard } from "./serieCard";


export function TemporadaSeries({ serie }) {
    return (
        <div>
            <EpisodioSerie episodio={ (nEpisodio, titulo, descricao) } />
        </div>
    )
}