export function Botao({ title, type, ...rest }) {
  return (
    <button
      type={type}
      className=" font-semibold px-8 py-2 border-3 border-main-orange rounded-lg bg-fundo-botao text-main-white"
    >
      {title}
    </button>
  );
}
