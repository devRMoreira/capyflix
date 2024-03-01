import Image from "next/image";


export function FilmeCompleto ({filme}) {
    
    return (
        <div className="text-black">
             <Image src={filme.capa} width="100" height="100" />
            <h2>{filme.titulo}</h2>
            <h2>{filme.tituloOriginal}</h2>
            <h3>{filme.genero}</h3>
            <p>{filme.duracao}</p>
            <p>{filme.classificacaoEtaria}</p>
            <p>{filme.mediaAvaliacoes}</p>
            <div>
                <h4>Sinopse</h4>
                <p>{filme.sinopse}</p>
                <h4>Elenco</h4>
                <p>{filme.elenco.nome}</p>
                <h4>Realizador</h4>
                <p>{filme.realizador.nome}</p>
            </div>
        </div>
    )
}

// const filme = {
//     "_id": "65de739be8cef6ce35e6ec23",
//     "titulo": "A Vida Secreta de Walter Mitty",
//     "tituloOriginal": "The Secret Life of Walter Mitty",
//     "genero": [
//       "Aventura",
//       "Comédia",
//       "Drama",
//       "Fantasia",
//       "Romance"
//     ],
//     "sinopse": "Quando seu trabalho junto com o de seu colega é ameaçado, Walter entra em ação no mundo real se embarcando numa jornada global que se transforma em a aventura mais extraordinária do que qualquer coisa que ele poderia ter imaginado.",
//     "realizador": {
//       "nome": "Ben Stiller",
//       "id": "65de73a5e8cef6ce35e6ec32"
//     },
//     "elenco": [
//       {
//         "nome": "Ben Stiller",
//         "id": "65de73a5e8cef6ce35e6ec32"
//       },
//       {
//         "nome": "Kristen Wiig",
//         "id": "65de73a5e8cef6ce35e6ec33"
//       },
//       {
//         "nome": "Jon Daly",
//         "id": "65de73a5e8cef6ce35e6ec34"
//       }
//     ],
//     "classificacaoEtaria": "+10",
//     "capa": "https://upload.wikimedia.org/wikipedia/pt/d/dd/The_Secret_Life_of_Walter_Mitty.jpg",
//     "trailer": "https://www.youtube.com/watch?v=QD6cy4PBQPI",
//     "duracao": 114,
//     "mediaAvaliacoes": 0,
//     "dataLancamento": 1380927600000,
//     "visualizacoes": 0,
//     "comentarios": []
//   }