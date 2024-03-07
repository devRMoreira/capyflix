import { Botao } from "@/frontend/components/botao";
import { Input } from "@/frontend/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  function handleClick(e) {
    e.preventDefault();

    console.log("Nome:", nome);
    console.log("Senha:", senha);
  }

  return (
    <div className=" min-h-screen max-w-96 h-full bg-fundo-principal flex flex-col items-center ">
      <Image className="mb-8" src="/logo.png" width="300" height="50" />

      <div className="mb-16">
        <p className=" text-laranja-principal">A Capyvara sabe o que é bom.</p>
      </div>
      <form onSubmit={handleClick} className=" flex flex-col items-center">
        <div className="mb-6">
          <Input
            icone="/icones/User.png"
            placeholder="Insere o teu nome de utilizador"
            type="text"
            name="username"
            id="username"
            value={nome}
            onChange={handleChangeNome}
          ></Input>
        </div>
        <div className=" mb-20">
          <Input
            icone="/icones/Password Key.png"
            placeholder="Insere a tua palavra-passe"
            type="password"
            name="password"
            id="password"
            value={senha}
            onChange={handleChangeSenha}
          ></Input>
        </div>
        <div className=" flex space-x-12 mb-8">
          <Botao title="LOGIN" on />
        </div>
        <div className=" mb-10">
          <Link href="/registar">
            <Botao title="REGISTAR" />
          </Link>
        </div>
      </form>
    </div>
  );
}
