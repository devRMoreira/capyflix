import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { PerfilNav } from "@/frontend/components/PerfilNav";
import { Estatisticas } from "@/frontend/components/Estatisticas";
import { FilmeSerieResumo } from "@/frontend/components/FilmeSerieResumo";
import { useState, useEffect } from "react";

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
  mediaAvaliacoes: 1,
  dataLancamento: 1380927600000,
  visualizacoes: 0,
  comentarios: [],
};

const serie = {
  mensagem: "Sucesso.",
  serie: {
    mensagem: "Sucesso.",
    serie: {
      _id: "65de739fe8cef6ce35e6ec2d",
      titulo: "Tenacious D",
      tituloOriginal: "Tenacious D",
      genero: ["Comédia", "Musical"],
      sinopse:
        "Tenacious D é um grupo musical de dois elementos, e esta série documenta as suas muitas lutas como amigos e como uma banda de dois indivíduos muito absurdos.",
      realizador: {
        nome: "Jack Black",
        id: "65de73a5e8cef6ce35e6ec35",
      },
      elenco: [
        {
          nome: "Jack Black",
          id: "65de73a5e8cef6ce35e6ec35",
        },
        {
          nome: "Kyle Glass",
          id: "65de73a5e8cef6ce35e6ec36",
        },
      ],
      classificacaoEtaria: "+18",
      capa: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/oqltGTLtKufpyVpnGXFqZpPFjSq.jpg",
      trailer: "https://www.youtube.com/watch?v=TCd7_pp0xnY",
      duracao: 12,
      temporadas: [
        [
          {
            titulo: "Episódio The Search for Inspirado",
            descricao:
              "Depois de um show de sucesso na noite de microfone aberto, o anfitrião, Paul F. Tompkins, pede ao Tenacious D para tocar uma nova canção. A banda procura inspiração, mas não consegue nada. A pressão disso leva à separação da banda. A separação da banda torna-se na inspiração para a nova canção.",
          },
          {
            titulo: "Angel in Disguise",
            descricao:
              "Jack se apaixona por uma garota chamada Flarna, e confessa seu amor por ela a Kyle. Kyle é então visto com Flarna, e Jack usa karate nele. Durante sua luta, Flarna é levado por um ladrão armado que atira em Jack, mas Kyle mergulha na frente da bala. Kyle é então visto deitado, imóvel. Enquanto Jack canta sobre a sua perda, Kyle reaparece, e na canção atribui sua sobrevivência a um grande medalhão de amizade que Jack lhe havia dado.",
          },
          {
            titulo: "Death of a Dream",
            descricao:
              "Após mais uma noite de microfone aberto, a banda anuncia um evento de assinatura de T-shirts. Quando ninguém aparece para a sessão de autógrafos, o par tem uma chance de falar com o dono da loja, Capitão Ed (Ernest M. Garcia), que convence o duo que acreditar que eles poderiam ser estrelas do rock é como acreditar no Pé-grande. A banda quase desiste do seu sonho, mas é salva quando eles descobrem que o Pé-grande existe.",
          },
          {
            titulo: "The Greatest Song in the World",
            descricao:
              "Um escritor se muda para o apartamento ao lado do Tenacious D, e quando estes iniciam seus rituais pré-show, seu novo vizinho fica extremamente incomodado. Ele chama a polícia, e o Tenacious D então cantam sua canção 'Tribute', para explicar o seu lado da história.",
          },
          {
            titulo: "The Fan",
            descricao:
              "Após atuar numa noite de microfone aberto, Black estupidamente lança sua palheta para a multidão e não pode mais continuar o show sem ela. Depois do show, Lee dá-lhes a palheta e divulga a informação no seu site de fãs. o Tenacious D vão imediatamente dar uma olhada, e se tornam stalkers de Lee. Eles invadem sua casa e cantam uma canção para ele, intitulada 'Lee', e no final do episódio eles são todos amigos novamente, e juntos cantam a música 'Special Thing' numa noite de microfone aberto.",
          },
          {
            titulo: "Road Gig",
            descricao:
              "O anfitrião da noite microfone aberto, Paul F. Tompkins, informa o Tenacious D que seu irmão precisa de algumas bandas para atuar no seu novo clube. Ele a convida o Tenacious D a ir, e eles fazem-se à estrada (embora o clube fique no fundo da rua). A caminho do show, um inseto atinge o para-brisas do carro, e não há nenhum fluido de limpeza.",
          },
        ],
      ],
      mediaAvaliacoes: 0,
      dataLancamento: 880675200000,
      visualizacoes: 0,
      comentarios: [],
    },
  },
};

const id = "65e5a01cde0f619624348e79";

export default function Perfil() {
  const [data, setData] = useState(null);
  const [queroAssistir, setQueroAssistir] = useState(null);
  const [assistidos, setAssistidos] = useState(null);
  const [favoritos, setFavoritos] = useState(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}`
          // { body: { lista: "visto" } }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setData(jsonData.utilizadorFiltrado);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDataPorVer = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}porVer`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setQueroAssistir(jsonData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDataVistos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}visto`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setAssistidos(jsonData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchFavoritos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}favorito`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setFavoritos(jsonData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchDataUser();
    fetchDataPorVer();
    fetchDataVistos();
    fetchFavoritos();
  }, []);

  return (
    <>
      {data && (
        <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
          <PerfilNav
            avatar={data.imagemPerfil}
            username={data.nome}
            comentarios="/icones/comentarios.png"
            ligacoes="/icones/followers.png"
            config="/icones/configuracoes.png"
          ></PerfilNav>
          <div className=" ml-4 mr-4">
            <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
              Quero Assistir
            </h1>
            {queroAssistir?.length && (
              <a href="/filme" className=" flex justify-center gap-10">
                <img className=" w-36" src={queroAssistir[0]?.capa}></img>
                <img className=" w-36" src={queroAssistir[1]?.capa}></img>
              </a>
            )}

            <div className="flex justify-center">
              <button className=" ">
                <img className=" mt-4" src="/icones/List.png"></img>
              </button>
            </div>

            <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
              Assistidos
            </h1>
            {assistidos?.length && (
              <a href="/filme" className=" flex justify-center gap-10">
                <img className=" w-36" src={assistidos[0]?.capa}></img>
                <img className=" w-36" src={assistidos[1]?.capa}></img>
              </a>
            )}

            <div className="flex justify-center">
              <button className=" ">
                <img className=" mt-4" src="/icones/List.png"></img>
              </button>
            </div>

            <h1 className=" mb-6 text-lg mt-6 font-semibold text-main-white">
              Favoritos
            </h1>
            {favoritos?.length && (
              <a href="/filme" className=" flex justify-center gap-10">
                <img className=" w-36" src={favoritos[0]?.capa}></img>
                <img className=" w-36" src={favoritos[1]?.capa}></img>
              </a>
            )}

            <div className="flex justify-center">
              <button className=" ">
                <img className=" mt-4" src="/icones/vermais.png"></img>
              </button>
            </div>

            <h1 className=" text-lg mt-6 font-semibold text-main-white">
              Estatísticas
            </h1>

            <h2 className=" mb-3 text-base mt-6 text-main-white">Filmes</h2>
            <div className=" mb-8 flex">
              <Estatisticas
                numero="50"
                titulo="Filmes Diferentes"
              ></Estatisticas>
              <Estatisticas
                numero="1000"
                titulo="Minutos Assistidos"
              ></Estatisticas>
              <Estatisticas
                numero="10"
                titulo="Gêneros Diferentes"
              ></Estatisticas>
            </div>
            <h2 className=" mb-3 text-base text-main-white">Séries</h2>
            <div className=" mb-20 flex">
              <Estatisticas
                numero="50"
                titulo="Filmes Diferentes"
              ></Estatisticas>
              <Estatisticas
                numero="1000"
                titulo="Minutos Assistidos"
              ></Estatisticas>
              <Estatisticas
                numero="10"
                titulo="Gêneros Diferentes"
              ></Estatisticas>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
