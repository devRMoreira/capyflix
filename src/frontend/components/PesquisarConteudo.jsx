import { useState } from "react"
import { CartãoPesquisa } from "./CartaoPesquisa"
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
}