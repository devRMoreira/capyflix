export function Input({
  onChange,
  value,
  id,
  name,
  icone,
  type,
  placeholder,
  ...rest
}) {
  return (
    <div className="relative flex justify-center items-center">
      <img
        src={icone}
        alt="Ícone Usuário"
        className=" absolute left-4 inset-y-auto"
      ></img>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className=" w-72 h-12 pl-12 px-8 py-2 text-sm border-2 border-laranja-principal rounded-lg bg-fundo-botao text-main-white"
        {...rest}
      ></input>
    </div>
  );
}
