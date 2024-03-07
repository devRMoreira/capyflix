import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchDadosUtilizador } from "@/frontend/services/utilizador";
import { userStore } from "../_app";


export default function perfil() {

    const { userLogado } = userStore((state) => state)

    const [utilizador, setUtilizador] = useState({})
    const [listas, setListas] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query

        async function setUser() {
            if (id === "user") {
                setUtilizador({ ...userLogado })

            } else {
                const dados = await fetchDadosUtilizador(id)
                setUtilizador(dados)
            }
        }

        setUser()

    }, [router.isReady]);

    // const [data, setData] = useState(null);
    // const [queroAssistir, setQueroAssistir] = useState(null);
    // const [assistidos, setAssistidos] = useState(null);
    // const [favoritos, setFavoritos] = useState(null);

    // useEffect(() => {
    //     const fetchDataUser = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:3000/api/utilizador/${id}`
    //             );
    //             if (!response.ok) {
    //                 throw new Error("Erro ao buscar os dados");
    //             }
    //             const jsonData = await response.json();
    //             await setData(jsonData.utilizadorFiltrado);
    //         } catch (error) {
    //             console.error("Erro ao buscar os dados:", error);
    //         }
    //     };

    //     const fetchDataPorVer = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:3000/api/utilizador/${id}porVer`
    //             );
    //             if (!response.ok) {
    //                 throw new Error("Erro ao buscar os dados");
    //             }
    //             const jsonData = await response.json();
    //             await setQueroAssistir(jsonData);
    //         } catch (error) {
    //             console.error("Erro ao buscar os dados:", error);
    //         }
    //     };

    //     const fetchDataVistos = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:3000/api/utilizador/${id}visto`
    //             );
    //             if (!response.ok) {
    //                 throw new Error("Erro ao buscar os dados");
    //             }
    //             const jsonData = await response.json();
    //             await setAssistidos(jsonData);
    //         } catch (error) {
    //             console.error("Erro ao buscar os dados:", error);
    //         }
    //     };

    //     const fetchFavoritos = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://localhost:3000/api/utilizador/${id}favorito`
    //             );
    //             if (!response.ok) {
    //                 throw new Error("Erro ao buscar os dados");
    //             }
    //             const jsonData = await response.json();
    //             await setFavoritos(jsonData);
    //         } catch (error) {
    //             console.error("Erro ao buscar os dados:", error);
    //         }
    //     };

    //     fetchDataUser();
    //     fetchDataPorVer();
    //     fetchDataVistos();
    //     fetchFavoritos();
    // }, []);

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
                    ></PerfilNav>
                    <div className=" ml-4 mr-4">
                        <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
                            Quero Assistir
                        </h1>
                        {queroAssistir?.length && (
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
                        {assistidos?.length && (
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
                        {favoritos?.length && (
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
