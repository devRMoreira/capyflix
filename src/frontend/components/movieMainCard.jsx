export function MovieMainCard ({Image, titulo, genero, duracao, faixa_etaria, classificacao}) {
    return (
        <div>
            <Image src="" width="100" height="100" />
            <h2>{titulo}</h2>
            <h3>{genero}</h3>
            <p>{duracao}</p>
            <p>{faixa_etaria}</p>
            <p>{classificacao}</p>
            <div>
                <h4>{Sinopse}</h4>
                <p>{Texto}</p>
            </div>
        </div>
    )
}