import { PerfilNav } from "@/frontend/components/PerfilNav";
import { fetchDadosUtilizadorPrivado } from "@/frontend/services/utilizador";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function privado() {

    const [utilizador, setUtilizador] = useState({})
    const router = useRouter()



    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query

        async function getUser() {



            const dados = await fetchDadosUtilizadorPrivado(id)
            setUtilizador(dados)
        }

        getUser()

    }, [router.isReady]);


    return (
        <div>
            {Object.keys(utilizador).length > 0 && (

                <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
                    <PerfilNav
                        avatar={utilizador.imagemPerfil}
                        username={utilizador.nome}
                        comentarios="/icones/comentarios.png"
                        ligacoes=""
                        id={utilizador._id}
                    />
                    <h1 className="text-main-white mt-10 text-center">Perfil privado!</h1>
                </div>
            )}
        </div>


    )

}