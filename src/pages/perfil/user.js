import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userStore } from "../_app";
import { fetchListaFavoritos, fetchListaPorVer, fetchListaVisto } from "@/frontend/services/listas";


export default function perfiluserLogado() {

    const { userLogado } = userStore((state) => state)

    const [listas, setListas] = useState({
        assistidos: [],
        favoritos: [],
        queroAssistir: []
    })


    useEffect(() => {
        async function getListas() {
            console.log("ola")
            const listaAssistidos = await fetchListaVisto(userLogado._id)
            setListas((ps) => ({ ...ps, assistidos: listaAssistidos }))
            console.log(listaAssistidos)
            const listaQueroAssistir = await fetchListaPorVer(userLogado._id)
            setListas((ps) => ({ ...ps, queroAssistir: listaQueroAssistir }))

            const listaFavoritos = await fetchListaFavoritos(userLogado._id)
            setListas((ps) => ({ ...ps, favoritos: listaFavoritos }))

        }

        if (userLogado._id) {
            getListas()
        }

    }, [])




    return (
        <div>
            {Object.keys(userLogado).length > 0 && (

                <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
                    {console.log(listas)}
                    <PerfilNav
                        avatar={userLogado.imagemPerfil}
                        username={userLogado.nome}
                        comentarios="/icones/comentarios.png"
                        ligacoes="/icones/followers.png"
                        config="/icones/configuracoes.png"
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
                                numero={userLogado.estatisticas.filmes.quantidade}
                                titulo="Filmes Diferentes"
                            ></Estatisticas>
                            <Estatisticas
                                numero={userLogado.estatisticas.filmes.tempo}
                                titulo="Minutos Assistidos"
                            ></Estatisticas>
                            {userLogado.estatisticas.filmes.generos.length > 0 && (
                                <Estatisticas
                                    numero={userLogado.estatisticas.filmes.generos.length}
                                    titulo="Gêneros Diferentes"
                                ></Estatisticas>
                            )}
                        </div>
                        <h2 className=" mb-3 text-base text-main-white">Séries</h2>
                        <div className=" mb-20 flex">
                            <Estatisticas
                                numero={userLogado.estatisticas.series.quantidade}
                                titulo="Séries Diferentes"
                            ></Estatisticas>
                            <Estatisticas
                                numero={userLogado.estatisticas.series.tempo}
                                titulo="Minutos Assistidos"
                            ></Estatisticas>
                            {userLogado.estatisticas.series.generos.length > 0 && (
                                <Estatisticas
                                    numero={userLogado.estatisticas.series.generos.length}
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
