export function EpisodioSerie({ episodios }) {
    return (
        <div>
            <h3>{episodios.numero}</h3>
            <h3>{episodios.titulo}</h3>
            <p>{episodios.descricao}</p>
        </div>)
}