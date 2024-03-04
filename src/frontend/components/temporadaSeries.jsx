import { EpisodioSerie } from "./episodioSerie";
import Image from "next/image";
import { SerieCard } from "./serieCard";


export function TemporadaSeries({ serie }) {
    return (
        <div>
            <div>
                <SerieCard serie={serie } />
            </div>
            <div>
               
            </div>
        </div>
    )
}