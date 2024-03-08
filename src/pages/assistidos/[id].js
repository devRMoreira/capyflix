import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function assistidos() {
    const [data, setData] = useState(null);
    const [assistidos, setAssistidos] = useState(null);

    const router = useRouter()

    function handleClick() {
        router.back()
    }

    useEffect(() => {

        if (!router.isReady) return;

        const { id } = router.query

        const fetchDataUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/utilizador/${id}`
                    // { body: { lista: "visto" } }
                );
                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados");
                }
                const jsonData = await response.json();
                await setData(jsonData.utilizadorFiltrado);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        const fetchDataVistos = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/utilizador/${id}visto`
                );
                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados");
                }
                const jsonData = await response.json();
                await setAssistidos(jsonData);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchDataUser();
        fetchDataVistos();
    }, [router.isReady]);

    return (
        <>
            {data && (
                <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
                    <div className=" ml-4 mr-4 mb-24">
                        <a onClick={handleClick}>
                            <img src="/icones/Back.png" className="  mt-6"></img>
                        </a>
                        <h1 className=" mb-6 text-lg mt-8 font-semibold text-main-white">
                            Assistidos
                        </h1>
                        <div className="flex flex-wrap justify-center gap-10">
                            {assistidos?.map((item, index) => (
                                <Link
                                    key={index}
                                    href={`/filme/${item._id}`}
                                    className=" flex justify-center gap-10"
                                >
                                    <img className=" w-36" src={item?.capa}></img>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
