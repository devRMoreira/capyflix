import { HomeFilmeSerieResumo } from "@/frontend/components/HomeFilmeSerieResumo";

const filme = {
  _id: "65de739be8cef6ce35e6ec23",
  titulo: "A Vida Secreta de Walter Mitty",
  tituloOriginal: "The Secret Life of Walter Mitty",
  genero: ["Aventura", "Comédia", "Drama", "Fantasia", "Romance"],
  sinopse:
    "Quando seu trabalho junto com o de seu colega é ameaçado, Walter entra em ação no mundo real se embarcando numa jornada global que se transforma em a aventura mais extraordinária do que qualquer coisa que ele poderia ter imaginado.",
  realizador: {
    nome: "Ben Stiller",
    id: "65de73a5e8cef6ce35e6ec32",
  },
  elenco: [
    {
      nome: "Ben Stiller",
      id: "65de73a5e8cef6ce35e6ec32",
    },
    {
      nome: "Kristen Wiig",
      id: "65de73a5e8cef6ce35e6ec33",
    },
    {
      nome: "Jon Daly",
      id: "65de73a5e8cef6ce35e6ec34",
    },
  ],
  classificacaoEtaria: "+10",
  capa: "https://upload.wikimedia.org/wikipedia/pt/d/dd/The_Secret_Life_of_Walter_Mitty.jpg",
  trailer: "https://www.youtube.com/watch?v=QD6cy4PBQPI",
  duracao: 114,
  mediaAvaliacoes: 0,
  dataLancamento: 1380927600000,
  visualizacoes: 0,
  comentarios: [],
};


export default function home() {
  return (
    <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col ">
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Recomendações
      </h1>
      <div className=" mt-5 flex justify-center items-center gap-10 w-full max-w-sm">
        <img className=" w-36" src={filme.capa}></img>
        <img className=" w-36" src={filme.capa}></img>
      </div>
      <h1 className=" ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
        Últimos Lançamentos
      </h1>
      <div className=" mt-4 ml-4 mr-4 mb-2 md:mt-4 md:ml-2 md:mr-2 md:mb-2">
        <HomeFilmeSerieResumo filme={filme}></HomeFilmeSerieResumo>
      </div>
      <div className=" ml-4 mr-4 md:ml-2 md:mr-2">
        <HomeFilmeSerieResumo filme={filme}></HomeFilmeSerieResumo>
      </div>
      <div className=" h-[50px]"></div>
    </div>
  );
}