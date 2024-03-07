import { HomeFilmeSerieResumo } from "@/frontend/components/HomeFilmeSerieResumo";
import { getFilmeAleatorio } from "@/frontend/services/filme";
import { getUltimosCinco } from "@/frontend/services/pesquisa";
import { getSerieAleatoria } from "@/frontend/services/serie";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function home() {

  const [conteudo, setConteudo] = useState({
    filmeAleatorio: {},
    serieAleatoria: {},
    ultimosCinco: []
  })

  useEffect(() => {

    async function getDados() {
      const filmeAleatorio = await getFilmeAleatorio()
      setConteudo((ps) => ({ ...ps, filmeAleatorio: filmeAleatorio }))


      const serieAleatoria = await getSerieAleatoria()
      setConteudo((ps) => ({ ...ps, serieAleatoria: serieAleatoria }))

      const ultimosCinco = await getUltimosCinco()
      setConteudo((ps) => ({...ps, ultimosCinco:ultimosCinco}))

    }

    getDados()

  }, [])

  return (
    <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Recomendações
      </h1>
      <div className=" mt-5 flex justify-center items-center gap-10 w-full max-w-sm">
        {conteudo.filmeAleatorio ? <img className="w-36" src={conteudo.filmeAleatorio.capa} /> : undefined}
        {conteudo.serieAleatoria ? <img className="w-36" src={conteudo.serieAleatoria.capa} /> : undefined}
      </div>
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Últimos Lançamentos
      </h1>
      <div className=" mt-4 ml-4 mr-4 mb-2 md:mt-4 md:ml-2 md:mr-2 md:mb-2">
      {/* <div className=" ml-4 mr-4 md:ml-2 md:mr-2"> */}

        {conteudo.ultimosCinco.length > 0 ? conteudo.ultimosCinco.map((ele) => <HomeFilmeSerieResumo conteudo={ele} />):undefined}
        {/* <HomeFilmeSerieResumo filme={filme}></HomeFilmeSerieResumo> */}
      </div>
      {/* <div className=" ml-4 mr-4 md:ml-2 md:mr-2"> */}
        {/* <HomeFilmeSerieResumo filme={filme}></HomeFilmeSerieResumo> */}
      {/* </div> */}
      <div className=" h-[50px]"></div>
    </div>
  );
}