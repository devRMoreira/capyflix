export default function PesquisarConteudo(){
   return (
    <div className="min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
    <div className="border border-laranja-principal rounded-2xl mt-5 mx-1 h-13 flex items-center">
      <button className="mr-2 focus:outline-none">
        <img src="/icones/Back.svg" alt="Back Arrow" width="50" height="50" />
      </button>
      <input
          className="bg-transparent border-none focus:outline-none text-main-white font-semibold text-xl text-start w-full px-3 py-2"
          type="text"
          placeholder="Pesquisar..."
        />
    </div>
  </div>
    )
}