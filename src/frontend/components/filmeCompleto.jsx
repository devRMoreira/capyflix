export function FilmeCompleto ({image, Titulo, Genero, Duracao, Faixa_etaria, Classificacao, Sinopse, Texto, Elenco, Realizador}) {
    
    
    return (
        <div>
            <Image src={image} width="100" height="100" />
            <h2>{Titulo_original}</h2>
            <h2>{Titulo_traducao}</h2>
            <h3>{Genero}</h3>
            <p>{Duracao}</p>
            <p>{Faixa_etaria}</p>
            <p>{Classificacao}</p>
            <div>
                <h4>{Sinopse}</h4>
                <p>{Texto}</p>
                <h4>{Elenco}</h4>
                <p>{Texto}</p>
                <h4>{Realizador}</h4>
                <p>{Texto}</p>
            </div>
        </div>
    )
}