import { Botao } from "@/frontend/components/botao";
import { Input } from "@/frontend/components/Input";
import { useState } from "react";

export default function Registar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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

  function handleClick(event) {
    event.preventDefault();

    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Senha Confirmada:", confirmarSenha);
  }

  return (
    <div className="flex flex-col items-center max-w-96 h-full bg-fundo-principal">
      <h1 className=" text-lg mt-10 font-semibold text-main-white">
        REGISTA-TE
      </h1>
      <form onSubmit={handleClick} className=" flex flex-col items-center">
        <div className="mt-14">
          <Input
            icone="/icones/User.png"
            placeholder="Insere o teu nome de utilizador"
            type="text"
            id="username"
            value={nome}
            onChange={handleChangeNome}
          ></Input>
        </div>
        <div className="mt-10">
          <Input
            icone="/icones/At Sign.png"
            placeholder="Insere o teu endereço de email"
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          ></Input>
        </div>
        <div className="mt-10">
          <Input
            icone="/icones/Password Key.png"
            placeholder="Insere a tua palavra-passe"
            type="password"
            id="password"
            value={senha}
            onChange={handleChangeSenha}
          ></Input>
        </div>
        <div className="mt-10">
          <Input
            icone="/icones/Password Key.png"
            placeholder="Confirma a tua palavra-passe"
            type="password"
            id="cpassword"
            value={confirmarSenha}
            onChange={handleChangeConfirmarSenha}
          ></Input>
        </div>
        <div className="mt-14">
          <Botao title="REGISTAR"></Botao>
        </div>
      </form>
    </div>
  );
}
