import { Comentario } from "@/frontend/components/Comentario";
import { fetchComentariosUtilizador } from "@/frontend/services/comentarios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function comentarios() {

    const router = useRouter()

    const [comentarios, setComentarios] = useState([])

    function handleClick(){
        router.back()
    }

    useEffect(() => {

        if (!router.isReady) return;

        const { id } = router.query

        async function getComentarios() {
            const dados = await fetchComentariosUtilizador(id)
            setComentarios(dados)

        }

        getComentarios()
    }, [router.isReady])



    return (
        <div className="flex flex-col md:max-w-96 min-h-screen h-full bg-fundo-principal">
            <Link href="" onClick={handleClick}>
                <img src="/icones/Back.png" className=" ml-4 mt-10"></img>
            </Link>
            <div className=" ml-8">
                <h1 className=" mb-10 text-lg mt-8 font-semibold text-main-white">
                    Comentários
                </h1>
            </div>
            {/* <Comentario
                avatar="/icones/avatar.png"
                username="Carolina"
                conteudo="testetestetetes"
            ></Comentario> */}
            {comentarios.length > 0 ? comentarios.map((ele) => <Comentario comentario={ele} />) : undefined}
        </div>
    );
}
