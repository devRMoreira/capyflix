

export function Botao({ title, ...rest }) {
    return (
      <button className=" font-semibold px-8 py-2 border-4 border-laranja-principal rounded-lg bg-fundo-botao text-white">
        {title}
      </button>
    );
  }
  