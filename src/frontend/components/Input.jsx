export function Input({ icone, placeholder, ...rest }) {
  return (
    <div>
      <img src={icone} alt="Ícone Usuário" className=""></img>
      <input
        type="text"
        placeholder={placeholder}
        className=" h-20 w-60 text-xs px-8 py-2 border-2 border-laranja-principal rounded-lg bg-fundo-botao text-main-white"
        {...rest}
      ></input>
    </div>
  );
}
