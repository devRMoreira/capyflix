import { Botao } from "@/frontend/components/Botao";
import { Input } from "@/frontend/components/Input";

export default function Registar() {
  return (
    <div className="flex flex-col items-center max-w-96 h-740 bg-main-background">
      <h1 className="  mt-10 font-semibold text-main-white">REGISTA-TE</h1>
      <div className="mt-10">
        <Input placeholder="Insere o teu nome de utilizador"></Input>
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
