import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { useState, useEffect } from "react";
import { userStore } from "../_app";
import { fetchListaFavoritos, fetchListaPorVer, fetchListaVisto } from "@/frontend/services/listas";
import Link from "next/link";


export default function perfiluserLogado() {

    const { userLogado } = userStore((state) => state)

    const [listas, setListas] = useState({
        assistidos: [],
        favoritos: [],
        queroAssistir: []
    })


    useEffect(() => {
        async function getListas() {
            const listaAssistidos = await fetchListaVisto(userLogado._id)
            setListas((ps) => ({ ...ps, assistidos: listaAssistidos }))

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
                    <PerfilNav
                        avatar={userLogado.imagemPerfil}
                        username={userLogado.nome}
                        comentarios="/icones/comentarios.png"
                        ligacoes="/icones/followers.png"
                        id={userLogado._id}
                        config={true}
                    />
                    <div className=" ml-4 mr-4">
                        <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
                            Quero Assistir
                        </h1>
                        {listas.queroAssistir.length > 0 && (
                            <div className=" flex justify-center gap-10">
                                <Link href={`${(listas.queroAssistir[0].tipo === "filme" ? "/filme/" : "/serie/") + listas.queroAssistir[0]._id}`}>
                                    <img className=" w-36" src={listas.queroAssistir[0]?.capa} />
                                </Link>

                                <Link href={`${(listas.queroAssistir[1].tipo === "filme" ? "/filme/" : "/serie/") + listas.queroAssistir[1]._id}`}>
                                    <img className=" w-36" src={listas.queroAssistir[1]?.capa} />
                                </Link>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Link href={`/queroAssistir/${userLogado._id}`}>
                                <img className=" mt-4" src="/icones/List.png"></img>
                            </Link>
                        </div>

                        <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
                            Assistidos
                        </h1>
                        {listas.assistidos.length > 0 && (
                            <div className=" flex justify-center gap-10">
                                <Link href={`${(listas.assistidos[0].tipo === "filme" ? "/filme/" : "/serie/") + listas.assistidos[0]._id}`}>
                                    <img className=" w-36" src={listas.assistidos[0]?.capa} />
                                </Link>

                                <Link href={`${(listas.assistidos[1].tipo === "filme" ? "/filme/" : "/serie/") + listas.assistidos[1]._id}`}>
                                    <img className=" w-36" src={listas.assistidos[1]?.capa} />
                                </Link>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Link href={`/assistidos/${userLogado._id}`}>
                                <img className=" mt-4" src="/icones/List.png"></img>
                            </Link>
                        </div>

                        <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
                            Favoritos
                        </h1>
                        {listas.favoritos.length > 0 && (
                            <div className=" flex justify-center gap-10">
                                <Link href={`${(listas.favoritos[0].tipo === "filme" ? "/filme/" : "/serie/") + listas.favoritos[0]._id}`}>
                                    <img className=" w-36" src={listas.favoritos[0]?.capa} />
                                </Link>

                                <Link href={`${(listas.favoritos[1].tipo === "filme" ? "/filme/" : "/serie/") + listas.favoritos[1]._id}`}>
                                    <img className=" w-36" src={listas.favoritos[1]?.capa} />
                                </Link>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Link href={`/favoritos/${userLogado._id}`}>
                                <img className=" mt-4" src="/icones/List.png"></img>
                            </Link>
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
