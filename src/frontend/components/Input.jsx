export function Input({ icone, placeholder, ...rest }) {
  return (
    <div className="relative">
      <img
        src={icone}
        alt="Ícone Usuário"
        className=" absolute left-4 inset-y-auto"
      ></img>
      <input
        type="text"
        placeholder={placeholder}
        className="  pl-20 h-20 text-xs px-8 py-2 border-2 border-laranja-principal rounded-lg bg-fundo-botao text-main-white"
        {...rest}
      ></input>
    </div>
  );
}
