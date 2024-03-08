import Link from "next/link";

export default function elenco() {
  return (
    <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
        <Link href="/perfil/user">
        <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
        </Link>
          <div className="flex mt-5 ml-5">
              <div className="flex justify-center">
                 <div>
                    <img src="" className="w-40 h-60"></img>
                </div>
                <div className="ml-5">
                    <h2 className=" text-main-white text-sm font-semibold">Nome </h2>
                    <h3 className=" text-main-white text-xs mt-2">Data de Nascimento:</h3>
                    <p className=" text-main-white text-xs mt-2">Descrição:</p>
                </div>
          </div>
          </div>
          
        <div className="ml-5 mt-4">
            <p className="text-main-white text-sm font-semibold">Participou em:</p>
            <img src="" className="w-20 h-30"></img>
         </div>
    </div>
  );
}
