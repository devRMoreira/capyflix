import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { FilmeSerieResumo } from "@/frontend/components/FilmeSerieResumo";

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

export default function Perfil() {
  return (
    <div className=" min-h-screen max-w-96 h-full bg-fundo-principal flex flex-col">
      <PerfilNav
        avatar="/icones/avatar.png"
        username="Carolina"
        comentarios="/icones/comentarios.png"
        ligacoes="/icones/ligacoes.png"
        config="/icones/configuracoes.png"
      ></PerfilNav>
      <div className=" ml-4 mr-4">
        <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
          Quero Assistir
        </h1>
        <FilmeSerieResumo filme={filme}></FilmeSerieResumo>
        <a href="/" className=" flex justify-center">
          <img className=" mt-4" src="/icones/List.png"></img>
        </a>

        <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
          Assistidos
        </h1>
        <FilmeSerieResumo filme={filme}></FilmeSerieResumo>
        <a href="/" className=" flex justify-center">
          <img className=" mt-4" src="/icones/List.png"></img>
        </a>

        <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
          Favoritos
        </h1>
        <div className=" flex gap-10">
          <img className=" w-36" src={filme.capa}></img>
          <img className=" w-36" src={filme.capa}></img>
        </div>
        <a href="/" className=" flex justify-center">
          <img className=" mt-4" src="/icones/vermais.png"></img>
        </a>

        <h1 className=" text-lg mt-6 font-semibold text-main-white">
          Estatísticas
        </h1>

        <h2 className=" mb-3 text-base mt-6 text-main-white">Filmes</h2>
        <div className=" mb-8 flex">
          <Estatisticas numero="50" titulo="Filmes Diferentes"></Estatisticas>
          <Estatisticas
            numero="1000"
            titulo="Minutos Assistidos"
          ></Estatisticas>
          <Estatisticas numero="10" titulo="Gêneros Diferentes"></Estatisticas>
        </div>
        <h2 className=" mb-3 text-base text-main-white">Séries</h2>
        <div className=" mb-20 flex">
          <Estatisticas numero="50" titulo="Filmes Diferentes"></Estatisticas>
          <Estatisticas
            numero="1000"
            titulo="Minutos Assistidos"
          ></Estatisticas>
          <Estatisticas numero="10" titulo="Gêneros Diferentes"></Estatisticas>
        </div>
      </div>

      <NavPrincipal
        home="/icones/Home.png"
        pesquisar="/icones/Search.png"
        perfil="/icones/avatar.png"
      ></NavPrincipal>
    </div>
  );
}
