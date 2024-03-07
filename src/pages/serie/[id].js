import { fetchSerie } from "@/frontend/services/serie";
import { useEffect, useState } from "react";
import { SerieCompleta } from "@/frontend/components/serieCompleta";
import { useRouter } from "next/router";


export default function Serie() {
    const router = useRouter()
    const [serie, setSerie] = useState({})

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query

        async function fetchDadosSerie(id) {

            const dados = await fetchSerie(id)

            setSerie(dados)
        }

        fetchDadosSerie(id)
    }, [router.isReady]);

    return (
        <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
            <div>
                {Object.keys(serie).length > 1 && <SerieCompleta serie={serie} />}
            </div>
        </div>
    );
}