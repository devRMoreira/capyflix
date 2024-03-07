import { SerieCompleta } from "@/frontend/components/SerieCompleta";
import { getSerie } from "@/frontend/services/serie";
import { useEffect, useState } from "react";
import { router } from "../_app";


export default function Serie() {

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