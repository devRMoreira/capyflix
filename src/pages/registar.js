import { Botao } from "@/frontend/components/botao";
import { Input } from "@/frontend/components/Input";

export default function Registar() {
  return (
    <div className="flex flex-col items-center max-w-96 h-740 bg-fundo-principal">
      <h1 className=" text-lg mt-10 font-semibold text-main-white">
        REGISTA-TE
      </h1>
      <div className="mt-10">
        <Input
          icone={require("../../public/icones/User.png")}
          placeholder="Insere o teu nome de utilizador"
        ></Input>
      </div>
      <div className="mt-6">
        <Input placeholder="Insere o teu endereço de email"></Input>
      </div>
      <div className="mt-6">
        <Input placeholder="Insere a tua palavra-passe"></Input>
      </div>
      <div className="mt-6">
        <Input placeholder="Confirma a tua palavra-passe"></Input>
      </div>
      <div className="mt-10">
        <Botao title="REGISTAR"></Botao>
      </div>
    </div>
  );
}
