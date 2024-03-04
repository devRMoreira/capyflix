import Image from "next/image";

const filme = {
    "_id": "65de739be8cef6ce35e6ec23",
    "titulo": "A Vida Secreta de Walter Mitty",
    "tituloOriginal": "The Secret Life of Walter Mitty",
    "genero": [
      "Aventura",
      "Comédia",
      "Drama",
      "Fantasia",
      "Romance"
    ],
    "sinopse": "Quando seu trabalho junto com o de seu colega é ameaçado, Walter entra em ação no mundo real se embarcando numa jornada global que se transforma em a aventura mais extraordinária do que qualquer coisa que ele poderia ter imaginado.",
    "realizador": {
      "nome": "Ben Stiller",
      "id": "65de73a5e8cef6ce35e6ec32"
    },
    "elenco": [
      {
        "nome": "Ben Stiller",
        "id": "65de73a5e8cef6ce35e6ec32"
      },
      {
        "nome": "Kristen Wiig",
        "id": "65de73a5e8cef6ce35e6ec33"
      },
      {
        "nome": "Jon Daly",
        "id": "65de73a5e8cef6ce35e6ec34"
      }
    ],
    "classificacaoEtaria": "+10",
    "capa": "https://upload.wikimedia.org/wikipedia/pt/d/dd/The_Secret_Life_of_Walter_Mitty.jpg",
    "trailer": "https://www.youtube.com/watch?v=QD6cy4PBQPI",
    "duracao": 114,
    "mediaAvaliacoes": 0,
    "dataLancamento": 1380927600000,
    "visualizacoes": 0,
    "comentarios": []
  }

export function FilmeCompleto ({filme}) {
    
    return (
        <div className="h-screen bg-fundo-principal relative">
            <div className="flex ">
                <div className="">
             <Image className="ml-2 mt-2" src={filme.capa} width="100" height="100" />
             </div>
             <div className="relative mt-2 ml-4">
            <h2 className="text-main-white">{filme.titulo}</h2>
            <h2 className="text-main-white">{filme.tituloOriginal}</h2>
            <h3 className="text-main-white">{filme.genero}</h3>
            <p className="text-main-white">{filme.duracao}</p>
            <p className="text-main-white">{filme.classificacaoEtaria}</p>
            <p className="text-main-white">{filme.mediaAvaliacoes}</p>
            </div>
            </div>
            <p className="text-main-white">Ver trailer</p>
            <div className="bg-fundo-principal flex flex-col items-left">
                <h4 className="text-main-white ">Sinopse</h4>
                <p className="text-main-white">{filme.sinopse}</p>
                <h4 className="text-main-white">Elenco</h4>
                <p className="text-main-white">{filme.elenco.nome}</p>
                <h4 className="text-main-white">Realizador</h4>
                <p className="text-main-white">{filme.realizador.nome}</p>
            </div>
        </div>
    )
}
