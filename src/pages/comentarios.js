import { Comentario } from "@/frontend/components/Comentario";

export default function Comentarios() {
  return (
    <div className="flex flex-col max-w-96 min-h-screen h-full bg-fundo-principal">
      <a href="/">
        <img src="/icones/Back.png" className=" ml-4 mt-10"></img>
      </a>
      <div className=" ml-8">
        <h1 className=" mb-10 text-lg mt-8 font-semibold text-main-white">
          Comentários
        </h1>
      </div>
      <Comentario
        avatar="/icones/avatar.png"
        username="Carolina"
        conteudo="testetestetetes"
      ></Comentario>
    </div>
  );
}
