import { HomeFilmeSerieResumo } from "@/frontend/components/HomeFilmeSerieResumo";



export default function home() {
  return (
    <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Recomendações
      </h1>
      <div className=" mt-5 flex justify-center items-center gap-10 w-full max-w-sm">
        <img className=" w-36" src={filme.capa}></img>
        <img className=" w-36" src={filme.capa}></img>
      </div>
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Últimos Lançamentos
      </h1>
      <div className=" mt-4 ml-4 mr-4 mb-2 md:mt-4 md:ml-2 md:mr-2 md:mb-2">
        <HomeFilmeSerieResumo filme={filme}></HomeFilmeSerieResumo>
      </div>
      <div className=" ml-4 mr-4 md:ml-2 md:mr-2">
        <HomeFilmeSerieResumo filme={filme}></HomeFilmeSerieResumo>
      </div>
      <div className=" h-[50px]"></div>
    </div>
  );
}