export function EpisodioSerie({ numero, titulo, descricao }) {
  return (
    <div>
      <p>Episodio: {numero}</p>
      <h3>Titulo: {titulo}</h3>
      <p>Descrição: {descricao}</p>
    </div>
  );
}
