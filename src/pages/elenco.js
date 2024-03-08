import Link from "next/link";

export default function elenco() {
  return (
    <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
      <div>
        <img src=""></img>
      </div>
      <div>
        <h2 className=" text-main-white">Nome:</h2>
        <h3 className=" text-main-white">Data de Nascimento:</h3>
        <p className=" text-main-white">Descrição:</p>
      </div>
      <div>
        <p>Participou em:</p>
        <img src=""></img>
      </div>
    </div>
  );
}
