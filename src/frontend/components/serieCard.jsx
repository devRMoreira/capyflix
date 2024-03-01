export function SerieCard({image, Titulo, Genero, Temporada, Faixa_etaria, Classificacao}){
    return(
        <div>
            <Image src={image} width="100" height="100" />
            <h2>{Titulo}</h2>
            <h3>{Genero}</h3>
            <p>{Temporada}</p>
            <p>{Faixa_etaria}</p>
            <p>{Classificacao}</p>
        </div>
    )
}