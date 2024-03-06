import moment from "moment";
import { EpisodioSerie } from "./episodioSerie";
import Image from "next/image";
import { useState } from "react";

export function SerieCompleta({ serie }) {
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
    <div className="h-full bg-fundo-principal text-main-white relative ">
       <div className="flex">
        <div className="mt-24 flex justify-center ">
            <Image className="ml-5" src={serie.capa} width="120" height="100" />
            </div>
            <div className="relative ml-5 mt-24 mr-1">
            <h2 className="text-sm leading-6 text-main-white font-semibold">{serie.titulo}</h2>
            <h2 className="text-sm leading-6 text-main-white font-medium">{serie.tituloOriginal}</h2>
            <h3 className="text-sm leading-6 text-main-white">{serie.genero.map((ele, index) => index < serie.genero.length - 1 ? ele + "/" : ele)}</h3>
            <h3 className="text-sm leading-6 text-main-white">Data de Lançamento: {moment(serie.dataLancamento).format('DD/MM/YYYY')}</h3>
            <p className="text-sm leading-6 text-main-white">{Object.keys(serie.temporadas).length}</p>
            <p className="text-sm leading-6 text-main-white">{serie.classificacaoEtaria}</p>
            <p className="text-sm leading-6 text-main-white">{serie.mediaAvaliacoes}</p>
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
        <a href={serie.trailer}>
          <img src="/icones/YouTube.png" alt="Ver trailer"></img>
        </a>
      </div>

      <div className="bg-fundo-principal flex flex-col items-left ml-5 mr-5">
        <h4 className="text-main-white mt-4 font-semibold">Sinopse:</h4>
        <p className="text-main-white mt-3">{serie.sinopse}</p>
        <h4 className="text-main-white mt-4 font-semibold">Elenco:</h4>
        <p className="text-main-white mt-3">
          {serie.elenco.map((ator, i) => (
            <span key={i}>
              {ator.nome}
              {i < serie.elenco.length - 1 && " / "}
            </span>
          ))}
        </p>
        <h4 className="text-main-white mt-6 font-semibold">Realizador:</h4>
        <p className="text-main-white mt-3">{serie.realizador.nome}</p>
        <div className="mt-3">
          {serie.temporadas.map((temporada, i) => (
            <div key={i}>
              <p className="font-semibold text-main-white">Temporada {i + 1}</p>
              {temporada.map((episodio, index2) => (
                <div><EpisodioSerie
                  key={index2}
                  numero={index2 + 1}
                  titulo={episodio.titulo}
                  descricao={episodio.descricao}
                /></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}