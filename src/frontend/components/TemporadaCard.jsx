import { useState } from "react";
import { EpisodioSerie } from "./EpisodioSerie";

export function TemporadaCard({ nTemporada, temporada }) {
  function handleClick() {
    setClicked((ps) => !ps);
  }

  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-full h-full bg-fundo-principal flex flex-col justify-center">
      <button
        className="border border-laranja-principal rounded-xl h-11 flex items-center bg-fundo-botao"
        onClick={handleClick}
      >
        <div className="flex justify-between items-center flex-grow">
          <p className="text-main-white font-normal text-m mx-1">
            Temporada{nTemporada}
          </p>
          <img src="/icones/dropdown.png" className="mr-2 h-6" />
        </div>
      </button>
      {clicked && (
        <div className="flex flex-wrap gap-2 ml-2">
          {temporada.map((ele, i) => (
            <EpisodioSerie
              numero={i + 1}
              titulo={ele.titulo}
              descricao={ele.descricao}
            />
          ))}
        </div>
      )}
    </div>
  );
}
