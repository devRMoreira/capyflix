export function Estatisticas({ numero, titulo }) {
  return (
    <div className=" w-full flex flex-col items-center ">
      <div className=" mb-1 text-4xl text-laranja-principal">{numero}</div>
      <div className=" text-center w-12 text-sm font-thin text-main-white">
        {titulo}
      </div>
    </div>
  );
}
