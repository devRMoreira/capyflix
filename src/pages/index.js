import { Botao } from "@/frontend/components/Botao";
import { Input } from "@/frontend/components/Input";
import { loginUtilizador } from "@/frontend/services/autenticacao";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toastError } from "./_app";
import { useRouter } from "next/router";

export default function index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter()

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  async function handleClick(e) {
    e.preventDefault();

    if(!email || !senha){
      return toastError("Por favor preenche todos os campos.")
    }

    const sucesso = await loginUtilizador(email, senha)

    if (!sucesso) {
      toastError("Dados inválidos.")
    } else {
      
      router.push("/home")
    }
    console.log("Email:", email);
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
            placeholder="Insere o teu email"
            type="text"
            name="username"
            id="username"
            value={email}
            onChange={handleChangeEmail}
          ></Input>
        </div>
        <div className=" mb-10">
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
