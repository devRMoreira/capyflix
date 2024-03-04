import { TemporadaSeries } from "./temporadaSeries";

export function SerieCompleta({serie}){
    return(
        <div>
            <div><img src={serie.capa} width="100" height="100" /></div>
            <h2>{serie.titulo}</h2>
            <h2>{serie.tituloOriginal}</h2>
            <h3>{serie.genero}</h3>
            <h3>{serie.dataLancamento}</h3>
            <p>{serie.temporadas}</p>
            <p>{serie.classificacaoEtaria}</p>
            <p>{serie.mediaAvaliacoes}</p>
            <div>
                <h4>Sinopse</h4>
                <p>{serie.sinopse}</p>
                <h4>Elenco</h4>
                <p>{serie.elenco.nome}</p>
                <h4>Realizador</h4>
                <p>{serie.realizador.nome}</p>
                <TemporadaSeries/>
                <TemporadaSeries/>
                <TemporadaSeries/>
                <TemporadaSeries/>
            </div>
        </div>
    )
}