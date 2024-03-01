export function SerieCompleta({image, titulo, tituloOriginal, genero, Temporada, Faixa_etaria, Classificacao}){
    return(
        <div>
            <Image src={image} width="100" height="100" />
            <h2>{titulo}</h2>
            <h2>{tituloOriginal}</h2>
            <h3>{genero}</h3>
            <p>{temporadas}</p>
            <p>{classificacaoEtaria}</p>
            <p>{Classificacao}</p>
            <div>
                <h4>Sinopse</h4>
                <p>{sinopse}</p>
                <h4>Elenco</h4>
                <p>{}</p>
                <Component/>
                <Component/>
                <Component/>
                <Component/>
            </div>
        </div>
    )
}