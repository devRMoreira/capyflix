import { Botao } from "@/frontend/components/Botao";
import { Input } from "@/frontend/components/Input";
import { registarUtilizador } from "@/frontend/services/utilizador";
import { useState } from "react";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastSuccess } from "./_app";
import { useRouter } from "next/router";



export default function Registar() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const router = useRouter()

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  const handleChangeConfirmarSenha = (event) => {
    setConfirmarSenha(event.target.value);
  };

  async function handleClick(event) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      toastError("Dados inválidos")
    }

    const sucesso = await registarUtilizador(nome, email, senha)
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Senha Confirmada:", confirmarSenha);

    if (!sucesso) {
      toastError("O email já se encontra registado")
    } else {
      toastSuccess("Registado com sucesso, por favor valide no email.")
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col items-center max-w-96 min-h-screen h-full bg-fundo-principal">
      <Image src="/logo.png" width="300" height="50" />
      <h1 className=" mb-10 text-2xl font-semibold text-main-white">
        REGISTA-TE
      </h1>
      <form onSubmit={handleClick} className=" flex flex-col items-center">
        <div >
          <Input
            icone="/icones/User.png"
            placeholder="Insere o teu nome de utilizador"
            type="text"
            id="username"
            value={nome}
            onChange={handleChangeNome}
          ></Input>
        </div>
        <div className="mt-6">
          <Input
            icone="/icones/At sign.png"
            placeholder="Insere o teu endereço de email"
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          ></Input>
        </div>
        <div className="mt-6">
          <Input
            icone="/icones/Password Key.png"
            placeholder="Insere a tua palavra-passe"
            type="password"
            id="password"
            value={senha}
            onChange={handleChangeSenha}
          ></Input>
        </div>
        <div className="mt-6">
          <Input
            icone="/icones/Password Key.png"
            placeholder="Confirma a tua palavra-passe"
            type="password"
            id="cpassword"
            value={confirmarSenha}
            onChange={handleChangeConfirmarSenha}
          ></Input>
        </div>
        <div className="mt-10">
          <Botao title="REGISTAR"></Botao>
        </div>
      </form>
    </div>
  );
}
