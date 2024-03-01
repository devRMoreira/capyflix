import { Botao } from "@/frontend/components/botao";
import { Input } from "@/frontend/components/Input";

export default function Registar() {
  return (
    <div className="flex flex-col items-center max-w-96 h-full bg-fundo-principal">
      <h1 className=" text-lg mt-10 font-semibold text-main-white">
        REGISTA-TE
      </h1>
      <div className="mt-14">
        <Input
          icone="/icones/User.png"
          placeholder="Insere o teu nome de utilizador"
        ></Input>
      </div>
      <div className="mt-10">
        <Input
          icone="/icones/At Sign.png"
          placeholder="Insere o teu endereço de email"
        ></Input>
      </div>
      <div className="mt-10">
        <Input
          icone="/icones/Password Key.png"
          placeholder="Insere a tua palavra-passe"
        ></Input>
      </div>
      <div className="mt-10">
        <Input
          icone="/icones/Password Key.png"
          placeholder="Confirma a tua palavra-passe"
        ></Input>
      </div>
      <div className="mt-14">
        <Botao title="REGISTAR"></Botao>
      </div>
    </div>
  );
}
