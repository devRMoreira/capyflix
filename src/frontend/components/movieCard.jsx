import Image from "next/image";

export function MovieCard({filme}){
    return(
        <div>
            <Image src={filme.capa} width="100" height="100" />
            <h2>{filme.titulo}</h2>
            <h2>{filme.tituloOriginal}</h2>
            <h3>{filme.genero.map((ele,index) => index < filme.genero.length-1 ? ele + "/" : ele)}</h3>
            <p>{filme.duracao}</p>
            <p>{filme.classificacaoEtaria}</p>
            <p>{filme.mediaAvaliacoes}</p>
        </div>
    )
}