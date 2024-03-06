import Image from "next/image";
import Link from "next/link";

export function CartãoPesquisa({ conteudo }) {
    return (
        < div className="border border-laranja-principal rounded-xl mt-3 mx-1 h-13 items-center h-10 flex flex-col" >
            {console.log(conteudo)}
            <Link href={ `/filme/${conteudo._id}`}>
                <Image src={conteudo.capa} alt={conteudo.titulo} width="50" height="50" className="ml-2" />
                <div className="flex flex-col">
                    <p className="text-main-white font-semibold text-xs ml-2">{conteudo.titulo}</p>
                    <p className="text-main-white font-semibold text-xxs italic opacity-50 ml-2">({conteudo.tipo})</p>
                </div>
            </Link>
        </div >
    )
}