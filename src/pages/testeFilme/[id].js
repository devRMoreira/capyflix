import { FilmeCompleto } from "@/frontend/components/filmeCompleto";
import { getFilme } from "@/frontend/services/filme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Filme() {

    const router = useRouter()
    const [filme, setFilme] = useState({})

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query

        async function getDadosFilme(id) {

            const dados = await getFilme(id)

            setFilme(dados)
            console.log(filme)
        }

        getDadosFilme(id)
    }, [router.isReady]);

    return (
        <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
            <div>
                {Object.keys(filme).length > 1 && <FilmeCompleto filme={filme} />}
            </div>
        </div>
    );
}
