import { EpisodioSerie } from "./episodioSerie";
import Image from "next/image";
import { SerieCard } from "./serieCard";


export function TemporadaSeries({ serie }) {
    return (
        <div>
            <div>
                <SerieCard/>
            </div>
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