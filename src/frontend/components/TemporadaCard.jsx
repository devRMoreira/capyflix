export function TemporadaCard({ temporadas }) {
  return (
    <div className=" w-full h-full bg-fundo-principal flex flex-col justify-center">
      <a href="/">
        <div className="border border-laranja-principal rounded-xl h-11 flex items-center bg-fundo-botao">
          <div className="flex justify-between items-center flex-grow">
            <p className=" text-main-white font-normal text-m mx-1">
              Temporadas
            </p>
            <img src="/icones/dropdown.png" className="mr-2 h-6"></img>
          </div>
        </div>
      </a>
    </div>
  );
}
