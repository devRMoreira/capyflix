import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { Comentario } from "./Comentario";

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
    <div className="h-full bg-fundo-principal relative ">
      <div className="flex">
        <div className="mt-24 flex justify-center">
          <Image className="ml-5" src={filme.capa} width="120" height="100" />
        </div>
        <div className="relative ml-5 mt-24 mr-1 ">
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
                <img src="/icones/visto-pintado.png" className="w-7 h-7"></img>
              ) : (
                <img src="/icones/visto.png" className=" w-7 h-7"></img>
              )}
            </button>
            <button onClick={iconeVerMaisIsClicked}>
              {verMaisIsClicked ? (
                <img
                  src="/icones/ver-mais-pintado.png"
                  className=" w-7 h-7"
                ></img>
              ) : (
                <img src="/icones/vermais.png" className="w-7 h-7"></img>
              )}
            </button>
            <button onClick={iconeLikeIsClicked}>
              {likeIsClicked ? (
                <img src="/icones/like-pintado.png" className=" w-7 h-7"></img>
              ) : (
                <img src="/icones/like.png" className="w-7 h-7"></img>
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

      <div className="bg-fundo-principal flex flex-col items-left ml-5 mr-5">
        <h4 className="text-main-white mt-3 font-semibold">Sinopse:</h4>
        <p className="text-main-white mt-3">{filme.sinopse}</p>
        <h4 className="text-main-white mt-3 font-semibold">Elenco:</h4>
        <p className="text-main-white mt-3">
          {filme.elenco.map((ele, i) => (
            <span>
              {i < filme.elenco.length - 1 ? `${ele.nome} /` : " " + ele.nome}{" "}
            </span>
          ))}
        </p>
        <h4 className="text-main-white mt-3 font-semibold">Realizador:</h4>
        <p className="text-main-white mt-3">{filme.realizador.nome}</p>
      </div>
      <div className="flex justify-center mt-3">
        <div className="border-t-2 border-gray-200 w-4/5 mt-3"></div>
      </div>
      <div>
        <button className="text-main-white font-semibold ml-5 mt-3 border border-laranja-principal rounded-lg">Comentários</button>
      </div>
    </div>
  );
}
