export function MovieCard({image, Titulo, Genero, Duracao, Faixa_etaria, Classificacao}){
    return(
        <div>
            <Image src={image} width="100" height="100" />
            <h2>{Titulo_original}</h2>
            <h2>{Titulo_traducao}</h2>
            <h3>{Genero}</h3>
            <p>{Duracao}</p>
            <p>{Faixa_etaria}</p>
            <p>{Classificacao}</p>
        </div>
    )
}