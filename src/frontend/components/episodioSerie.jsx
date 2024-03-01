export function EpisodioSerie ({serie}){
    return (
        <div>
            <p>{serie.temporadas.episodios.numero}</p>
            <h4>{serie.temporadas.episodios.titulo}</h4>
            <div>
               <p>{serie.temporadas.episodios.descricao}</p>
            </div>
        </div>
    )
}