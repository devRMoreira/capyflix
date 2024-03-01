export function Botao({ title, ...rest }) {
  return (
    <button className=" font-semibold px-8 py-2 border-4 border-main-orange rounded-lg bg-fundo-botao text-main-white">
      {title}
    </button>
  );
}
