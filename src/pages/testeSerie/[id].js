import { SerieCompleta } from "@/frontend/components/serieCompleta";
import { getSerie } from "@/frontend/services/serie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Serie() {

    const router = useRouter()
    const [serie, setSerie] = useState({})

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query

        async function getDadosSerie(id) {

            const dados = await getSerie(id)

            setSerie(dados)
        }

        getDadosSerie(id)
    }, [router.isReady]);

    return (
        <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
            <div>
                {Object.keys(serie).length > 1 && <SerieCompleta serie={serie} />}
            </div>
        </div>
    );
}