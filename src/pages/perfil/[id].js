import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchDadosUtilizador, fetchPrivado } from "@/frontend/services/utilizador";
import { fetchListaFavoritos, fetchListaPorVer, fetchListaVisto } from "@/frontend/services/listas";


export default function perfil() {

    const [utilizador, setUtilizador] = useState({})
    const [listas, setListas] = useState({
        assistidos: [],
        favoritos: [],
        queroAssistir: []
    })
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query



        async function getUser() {

            const privado = await fetchPrivado(id)

            if (!privado.privado) {

                const dados = await fetchDadosUtilizador(id)
                setUtilizador(dados)
                
            } else {
                
                router.push(`/perfil/privado/${id}`)
            }

        }

        getUser()

    }, [router.isReady]);

    useEffect(() => {
        async function getListas() {

            const listaAssistidos = await fetchListaVisto(utilizador._id)
            setListas((ps) => ({ ...ps, assistidos: listaAssistidos }))

            const listaQueroAssistir = await fetchListaPorVer(utilizador._id)
            setListas((ps) => ({ ...ps, queroAssistir: listaQueroAssistir }))

            const listaFavoritos = await fetchListaFavoritos(utilizador._id)
            setListas((ps) => ({ ...ps, favoritos: listaFavoritos }))


        }

        if (utilizador._id) {
            getListas()
        }

    }, [utilizador._id])




    return (
        <div>
            {Object.keys(utilizador).length > 0 && (

                <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
                    <PerfilNav
                        avatar={utilizador.imagemPerfil}
                        username={utilizador.nome}
                        comentarios="/icones/comentarios.png"
                        ligacoes="/icones/followers.png"
                        id={utilizador._id}
                    />
                    <div className=" ml-4 mr-4">
                        <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
                            Quero Assistir
                        </h1>
                        {listas.queroAssistir.length > 0 && (
                            <a href="/filme" className=" flex justify-center gap-10">
                                <img className=" w-36" src={listas.queroAssistir[0]?.capa}></img>
                                <img className=" w-36" src={listas.queroAssistir[1]?.capa}></img>
                            </a>
                        )}

                        <div className="flex justify-center">
                            <a href="/queroAssistir">
                                <img className=" mt-4" src="/icones/List.png"></img>
                            </a>
                        </div>

                        <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
                            Assistidos
                        </h1>
                        {listas.assistidos.length > 0 && (
                            <a href="/filme" className=" flex justify-center gap-10">
                                <img className=" w-36" src={listas.assistidos[0]?.capa}></img>
                                <img className=" w-36" src={listas.assistidos[1]?.capa}></img>
                            </a>
                        )}

                        <div className="flex justify-center">
                            <a href="/assistidos" className=" ">
                                <img className=" mt-4" src="/icones/List.png"></img>
                            </a>
                        </div>

                        <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
                            Favoritos
                        </h1>
                        {listas.favoritos.length > 0 && (
                            <a href="/filme" className=" flex justify-center gap-10">
                                <img className=" w-36" src={listas.favoritos[0]?.capa}></img>
                                <img className=" w-36" src={listas.favoritos[1]?.capa}></img>
                            </a>
                        )}

                        <div className="flex justify-center">
                            <a href="/favoritos">
                                <img className=" mt-4" src="/icones/List.png"></img>
                            </a>
                        </div>

                        <h1 className=" text-lg mt-6 font-semibold text-main-white">
                            Estatísticas
                        </h1>

                        <h2 className=" mb-3 text-base mt-6 text-main-white">Filmes</h2>
                        <div className=" mb-8 flex">
                            <Estatisticas
                                numero={utilizador.estatisticas.filmes.quantidade}
                                titulo="Filmes Diferentes"
                            ></Estatisticas>
                            <Estatisticas
                                numero={utilizador.estatisticas.filmes.tempo}
                                titulo="Minutos Assistidos"
                            ></Estatisticas>
                            {utilizador.estatisticas.filmes.generos.length > 0 && (
                                <Estatisticas
                                    numero={utilizador.estatisticas.filmes.generos.length}
                                    titulo="Gêneros Diferentes"
                                ></Estatisticas>
                            )}
                        </div>
                        <h2 className=" mb-3 text-base text-main-white">Séries</h2>
                        <div className=" mb-20 flex">
                            <Estatisticas
                                numero={utilizador.estatisticas.series.quantidade}
                                titulo="Séries Diferentes"
                            ></Estatisticas>
                            <Estatisticas
                                numero={utilizador.estatisticas.series.tempo}
                                titulo="Minutos Assistidos"
                            ></Estatisticas>
                            {utilizador.estatisticas.series.generos.length > 0 && (
                                <Estatisticas
                                    numero={utilizador.estatisticas.series.generos.length}
                                    titulo="Gêneros Diferentes"
                                ></Estatisticas>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
