import { HomeFilmeSerieResumo } from "@/frontend/components/HomeFilmeSerieResumo";
import { fetchFilmeAleatorio } from "@/frontend/services/filme";
import { fetchUltimosCinco } from "@/frontend/services/pesquisa";
import { fetchSerieAleatoria } from "@/frontend/services/serie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { userStore } from "./_app";



export default function home() {

  const { user, setUser } = userStore((state) => state)


  const [conteudo, setConteudo] = useState({
    filmeAleatorio: {},
    serieAleatoria: {},
    ultimosCinco: []
  })

  useEffect(() => {


    async function fetchDados() {
      const filmeAleatorio = await fetchFilmeAleatorio()
      setConteudo((ps) => ({ ...ps, filmeAleatorio: filmeAleatorio }))


      const serieAleatoria = await fetchSerieAleatoria()
      setConteudo((ps) => ({ ...ps, serieAleatoria: serieAleatoria }))

      const ultimosCinco = await fetchUltimosCinco()
      setConteudo((ps) => ({ ...ps, ultimosCinco: ultimosCinco }))

    }

    fetchDados()

  }, [])

  return (
    <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Recomendações
      </h1>
      <div className=" mt-5 flex justify-center items-center gap-10 w-full max-w-sm">

        {conteudo.filmeAleatorio ? <Image width={360} height={0} className="w-36" src={conteudo.filmeAleatorio.capa} /> : undefined}

        {conteudo.serieAleatoria ? <Image width={360} height={0} className="w-36" src={conteudo.serieAleatoria.capa} /> : undefined}

      </div>
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Últimos Lançamentos
      </h1>
      <div className="mt-4 ml-4 mr-4 mb-2 md:mt-4 md:ml-2 md:mr-2 md:mb-2">

        {conteudo.ultimosCinco.length > 0 ? conteudo.ultimosCinco.map((ele) => <HomeFilmeSerieResumo conteudo={ele} />) : undefined}

      </div>
      <div className=" h-[50px]" />
    </div>
  );
}