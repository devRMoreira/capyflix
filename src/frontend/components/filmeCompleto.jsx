import moment from "moment";
import Image from "next/image";
import { useState } from "react";

const filme = {
  _id: "65de739be8cef6ce35e6ec23",
  titulo: "A Vida Secreta de Walter Mitty",
  tituloOriginal: "The Secret Life of Walter Mitty",
  genero: ["Aventura", "Comédia", "Drama", "Fantasia", "Romance"],
  sinopse:
    "Quando seu trabalho junto com o de seu colega é ameaçado, Walter entra em ação no mundo real se embarcando numa jornada global que se transforma em a aventura mais extraordinária do que qualquer coisa que ele poderia ter imaginado.",
  realizador: {
    nome: "Ben Stiller",
    id: "65de73a5e8cef6ce35e6ec32",
  },
  elenco: [
    {
      nome: "Ben Stiller",
      id: "65de73a5e8cef6ce35e6ec32",
    },
    {
      nome: "Kristen Wiig",
      id: "65de73a5e8cef6ce35e6ec33",
    },
    {
      nome: "Jon Daly",
      id: "65de73a5e8cef6ce35e6ec34",
    },
  ],
  classificacaoEtaria: "+10",
  capa: "https://upload.wikimedia.org/wikipedia/pt/d/dd/The_Secret_Life_of_Walter_Mitty.jpg",
  trailer: "https://www.youtube.com/watch?v=QD6cy4PBQPI",
  duracao: 114,
  mediaAvaliacoes: 0,
  dataLancamento: 1380927600000,
  visualizacoes: 0,
  comentarios: [],
};

export function FilmeCompleto({ filme }) {
  const [vistoIsClicked, setvistoIsClicked] = useState(false);
  const [verMaisIsClicked, setverMaisIsClicked] = useState(false);
  const [likeIsClicked, setLikeIsClicked] = useState(false);

  const iconeVistoIsClicked = () => {
    setvistoIsClicked(!vistoIsClicked);
  };

  const iconeVerMaisIsClicked = () => {
    setverMaisIsClicked(!verMaisIsClicked);
  };

  const iconeLikeIsClicked = () => {
    setLikeIsClicked(!likeIsClicked);
  };

  return (
    <div className="h-screen bg-fundo-principal relative mt-10">
      <div className="flex">
        <div className="mt-5 flex justify-center items-center gap-10 w-full max-w-sm">
          <Image
            className="ml-2 mt-2"
            src={filme.capa}
            width="100"
            height="100"
          />
        </div>
        <div className="relative ml-1 ">
          <h2 className="text-sm leading-6 text-main-white font-semibold">
            {filme.titulo}
          </h2>
          <h2 className="text-sm leading-6 text-main-white font-medium">
            {filme.tituloOriginal}
          </h2>
          <h3 className="text-sm leading-6 text-main-white">
            {filme.genero.map((ele, index) =>
              index < filme.genero.length - 1 ? ele + "/" : ele
            )}
          </h3>
          <h3 className="text-sm leading-6 text-main-white">
            Data de Lançamento:{" "}
            {moment(filme.dataLancamento).format("DD/MM/YYYY")}
          </h3>
          <p className="text-sm leading-6 text-main-white">{filme.duracao}</p>
          <p className="text-sm leading-6 text-main-white">
            {filme.classificacaoEtaria}
          </p>
          <p className="text-sm leading-6 text-main-white">
            {filme.mediaAvaliacoes}
          </p>
          <div className="flex items-center justify-end gap-3 mr-10">
            <button onClick={iconeVistoIsClicked}>
              {vistoIsClicked ? (
                <img src="/icones/visto-pintado.png" className="w-6 h-6"></img>
              ) : (
                <img src="/icones/visto.png" className=" w-6 h-6"></img>
              )}
            </button>
            <button onClick={iconeVerMaisIsClicked}>
              {verMaisIsClicked ? (
                <img
                  src="/icones/ver-mais-pintado.png"
                  className=" w-6 h-6"
                ></img>
              ) : (
                <img src="/icones/vermais.png" className="w-6 h-6"></img>
              )}
            </button>
            <button onClick={iconeLikeIsClicked}>
              {likeIsClicked ? (
                <img src="/icones/like-pintado.png" className=" w-6 h-6"></img>
              ) : (
                <img src="/icones/like.png" className="w-6 h-6"></img>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-1">
        <p className="text-main-white ml-7 text-xs">Ver trailer</p>
        <a href={filme.trailer}>
          <img src="/icones/YouTube.png" alt="Ver trailer"></img>
        </a>
      </div>

      <div className="bg-fundo-principal flex flex-col items-left">
        <h4 className="text-main-white mt-4 ml-5 font-semibold">Sinopse</h4>
        <p className="text-main-white mt-3 ml-5">{filme.sinopse}</p>
        <h4 className="text-main-white mt-3 ml-5 font-semibold">Elenco</h4>
        <p className="text-main-white mt-3 ml-5">{filme.elenco.nome}</p>
        <h4 className="text-main-white mt-6 ml-5 font-semibold">Realizador</h4>
        <p className="text-main-white mt-3 ml-5">{filme.realizador.nome}</p>
      </div>
      <div className="flex justify-center">
        <div className="border-t-2 border-gray-200 w-4/5 mt-4"></div>
      </div>
    </div>
  );
}
