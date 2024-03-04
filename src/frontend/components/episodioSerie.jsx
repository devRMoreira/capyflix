export function EpisodioSerie(episodio) {
    return (
        <div>
            <h3>{episodio.numero}</h3>
            <h3>{episodio.titulo}</h3>
            <p>{episodio.descricao}</p>
        </div>)
}