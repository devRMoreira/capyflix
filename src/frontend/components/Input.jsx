export function Input({ icone, placeholder, ...rest }) {
  return (
    <input
      icone={icone}
      type="text"
      placeholder={placeholder}
      className="px-8 py-2 border-2 border-main-orange rounded-lg bg-fundo-botao text-main-white"
    ></input>
  );
}
