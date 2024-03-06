export function TemporadaCard ({temporadas}){
    return (
            <div className="min-h-screen w-full h-full bg-fundo-principal flex flex-col justify-center">
   <a href="/">
    <div className="border border-laranja-principal rounded-xl h-11 flex items-center bg-fundo-botao">
        <div className="flex justify-between items-center flex-grow">
               <p className="ml-4 text-main-white font-normal text-xs mx-2">Temporada</p>   
        <img src="/icones/dropdown.png" className="mr-2 h-6"></img>
      </div>
      </div>
      </a>
        </div>
    )
}