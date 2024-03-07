import { FilmeCompleto } from "@/frontend/components/FilmeCompleto";
import { fetchFilme } from "@/frontend/services/filme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Filme({conteudo}) {

    const [filme, setFilme] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query

        setFilme(id ? fetchDadosUtilizador(id) : { ...conteudo })

        async function fetchDadosFilme(id) {
            const dados = await fetchFilme(id)

            setFilme(dados)
        }

        fetchDadosFilme(id)
    }, [router.isReady]);

    return (
        <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
            <div>
                {Object.keys(filme).length > 1 && <FilmeCompleto filme={filme} />}
            </div>
        </div>
    );
}
