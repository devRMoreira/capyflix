import { Botao } from "@/frontend/components/Botao";
import { FilmeCompleto } from "@/frontend/components/filmeCompleto";
import Image from "next/image";

export default function Login() {
  return (
    <div className="bg-principal flex flex-col items-center ">
      <div className=" ">
        <Image src="/logo.png" width="300" height="50" />
      </div>
      <div className="mb-20">
        <p className=" text-laranja-principal">
          CapyFlix: A Capyvara sabe o que é bom.
        </p>
      </div>
      <div className="mb-20 ring-2 ring-laranja-principal">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Insere o teu nome de utilizador"
        ></input>
      </div>
      <div className="mb-20 ring-2 ring-laranja-principal">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Insere a tua palavra-passe"
        ></input>
      </div>
      <div className="flex space-x-12 mb-24">
        <Botao title = "LOGIN"/>
        <Botao title = "REGISTAR"/>
      </div>
      <FilmeCompleto/>
    </div>
  );
}
