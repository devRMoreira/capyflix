import Image from "next/image";
import Link from "next/link";


export function CartãoPesquisa({ conteudo }) {

    return (
        <Link href={conteudo.tipo === "filme" ? `/testeFilme/${conteudo._id}` : `/serie/${conteudo._id}`}>
            <div className="border border-laranja-principal rounded-xl mt-3 mx-1 h-20 flex items-center" >
                <Image src={conteudo.capa} alt={conteudo.titulo} width="40" height="24" className="ml-2" />
                <div className="flex flex-col">
                    <p className="text-main-white font-semibold text-base ml-2">{conteudo.titulo}</p>
                    <p className="text-main-white font-semibold text-sm italic opacity-50 ml-2">({conteudo.tipo})</p>
                </div>
            </div >
        </Link>
    )
}