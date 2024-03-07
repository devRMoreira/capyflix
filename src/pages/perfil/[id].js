import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchDadosUtilizador } from "@/frontend/services/utilizador";
import { userStore } from "../_app";
import { fetchListaFavoritos, fetchListaPorVer, fetchListaVisto } from "@/frontend/services/listas";


export default function perfil() {

    const { userLogado } = userStore((state) => state)

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
            if (id === "user") {
                setUtilizador({ ...userLogado })

            } else {
                const dados = await fetchDadosUtilizador(id)
                setUtilizador(dados)
            }
        }

        async function getListas() {

            if (id !== "user") {
                const listaAssistidos = await fetchListaVisto(id)
                setListas((ps) => ({ ...ps, assistidos: listaAssistidos }))

                const listaQueroAssistir = await fetchListaPorVer(id)
                setListas((ps) => ({ ...ps, queroAssistir: listaQueroAssistir }))

                const listaFavoritos = await fetchListaFavoritos(id)
                setListas((ps) => ({ ...ps, favoritos: listaFavoritos }))

            } else {
                const listaAssistidos = await fetchListaVisto(utilizador._id)
                setListas((ps) => ({ ...ps, assistidos: listaAssistidos }))

                const listaQueroAssistir = await fetchListaPorVer(utilizador._id)
                setListas((ps) => ({ ...ps, queroAssistir: listaQueroAssistir }))

                const listaFavoritos = await fetchListaFavoritos(utilizador._id)
                setListas((ps) => ({ ...ps, favoritos: listaFavoritos }))

            }

        }
        getUser()
        getListas()

    }, [router.isReady]);


    return (
        <div>
            {Object.keys(utilizador).length > 0 && (
                <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
                    {console.log(utilizador)}
                    <PerfilNav
                        avatar={utilizador.imagemPerfil}
                        username={utilizador.nome}
                        comentarios="/icones/comentarios.png"
                        ligacoes="/icones/followers.png"
                        config="/icones/configuracoes.png"
                    />
                    <div className=" ml-4 mr-4">
                        <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
                            Quero Assistir
                        </h1>
                        {listas.queroAssistir?.length && (
                            <a href="/filme" className=" flex justify-center gap-10">
                                <img className=" w-36" src={queroAssistir[0]?.capa}></img>
                                <img className=" w-36" src={queroAssistir[1]?.capa}></img>
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
                        {listas.assistidos?.length && (
                            <a href="/filme" className=" flex justify-center gap-10">
                                <img className=" w-36" src={assistidos[0]?.capa}></img>
                                <img className=" w-36" src={assistidos[1]?.capa}></img>
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
                        {listas.favoritos?.length && (
                            <a href="/filme" className=" flex justify-center gap-10">
                                <img className=" w-36" src={favoritos[0]?.capa}></img>
                                <img className=" w-36" src={favoritos[1]?.capa}></img>
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
                            {utilizador.estatisticas.filmes.generos?.length && (
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
                            {utilizador.estatisticas.series.generos?.length && (
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
