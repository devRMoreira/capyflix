import { useState } from "react"
import { CartãoPesquisa } from "./cartaoPesquisa"
import { getPesquisa } from "../services/pesquisa"




export default function PesquisarConteudo() {

  const [pesquisa, setPesquisa] = useState([])

  async function onChangeInput(e) {
    if (e.target.value.length > 1) {
      const resultado = await getPesquisa(e.target.value)
      setPesquisa((ps)=> ps = resultado)      
    }
  }


  return (
    <div className="min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
      <div className="border border-laranja-principal rounded-2xl mt-5 mx-1 h-20 items-center flex ">
        <button className="mr-2 focus:outline-none">
          <a href="/">
            <img src="/icones/Back.svg" alt="Back Arrow" width="50" height="50" />
          </a>
        </button>
        <input
          className="bg-transparent border-none focus:outline-none text-main-white font-semibold text-xl text-start w-full px-3 py-2"
          type="text"
          placeholder="Pesquisar..."
          onChange={(e) => onChangeInput(e)}
        ></input>
      </div>
      {pesquisa.length > 0 ? pesquisa.map((ele) => <CartãoPesquisa conteudo={ele} />) : undefined}
    </div>)
  {/* Aqui estou a testar os mini cards - resultados do filtro da pesquisa*/ }
  {/* Coloquei a imagem do logo nos mini cards para ver se ficaram direitos*/ }

  {/* <a href="/">
        
      </a>
      <a href="/">
        <div className="border border-laranja-principal rounded-xl mt-1 mx-1 h-13 flex items-center h-10">
          <img src="/logo.png" alt="Título do conteúdo" width="50" height="50" className="ml-2" />
          <div className="flex flex-col">
            <p className="text-main-white font-semibold text-xs ml-2">Stranger Things</p>
            <p className="text-main-white font-semibold text-xxs italic opacity-50 ml-2">(Série)</p>
          </div>
        </div>
      </a>
      <a href="/">
        <div className="border border-laranja-principal rounded-xl mt-1 mx-1 h-13 flex items-center h-10">
          <img src="/logo.png" alt="Título do conteúdo" width="50" height="50" className="ml-2" />
          <div className="flex flex-col">
            <p className="text-main-white font-semibold text-xs ml-2">Svaha: The Sixth Finger</p>
            <p className="text-main-white font-semibold text-xxs italic opacity-50 ml-2">(Filme)</p>
          </div>
        </div>
      </a>
    </div> */}

}