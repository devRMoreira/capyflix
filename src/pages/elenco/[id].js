import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";



export default function elenco() {
    const [data, setData] = useState(null);
    const router = useRouter()

    function handleClick() {
        router.back()
    }

    useEffect(() => {

        if (!router.isReady) return;

        const { id } = router.query

        const fetchDataElenco = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/equipa/${id}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados");
                }
                const jsonData = await response.json();
                await setData(jsonData.membro);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchDataElenco();
    }, [router.isReady]);

    return (
        <>
            {data && (
                <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
                    <Link href={""} onClick={handleClick}>
                        <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
                    </Link>
                    <div className="flex mt-5 ml-5">
                        <div className="flex justify-center">
                            <div>
                                <img src={data.foto} className="w-40 h-60"></img>
                            </div>
                            <div className="ml-5">
                                <h2 className=" text-main-white text-sm font-semibold">
                                    {data.nome}
                                </h2>
                                <h3 className=" text-main-white text-xs mt-2">
                                    {moment(data.dataDeNascimento).format("DD/MM/YYYY")}
                                </h3>
                                <p className=" text-main-white text-xs mt-2">
                                    {data.descricao}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="ml-5 mt-4">
                        <p className="text-main-white text-sm font-semibold">
                            Participou em:
                        </p>
                        <div className="flex flex-wrap justify-center gap-10">
                            {data.participaEm?.map((item, index) => (
                                <Link href={`/${item.tipo}/${item.id}`}>
                                    <div className="flex justify-center gap-10">
                                        <p className="text-main-white">
                                            {item.id}
                                        </p>
                                        <img key={index} className="w-20 h-30"></img>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
