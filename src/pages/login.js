import { Botao } from "@/frontend/components/botao";
import { Input } from "@/frontend/components/Input";
import Image from "next/image";

export default function Login() {
  return (
    <div className=" max-w-96 h-full bg-fundo-principal flex flex-col items-center ">
      <div className=" ">
        <Image src="/logo.png" width="300" height="50" />
      </div>
      <div className="mb-20">
        <p className=" text-laranja-principal">A Capyvara sabe o que é bom.</p>
      </div>
      <div className="mb-14">
        <Input
          icone="/icones/User.png"
          placeholder="Insere o teu nome de utilizador"
        ></Input>
      </div>
      <div className=" mb-24">
        <Input
          icone="/icones/Password Key.png"
          placeholder="Insere a tua palavra-passe"
        ></Input>
      </div>
      <div className="flex space-x-12 mb-24">
        <Botao title="LOGIN" />
        <Botao title="REGISTAR" />
      </div>
    </div>
  );
}
