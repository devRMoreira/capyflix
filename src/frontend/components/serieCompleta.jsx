import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TemporadaCard } from "./TemporadaCard";
import Link from "next/link";
import { userStore } from "@/pages/_app";
import { fetchComentariosSerie } from "../services/serie";
import { Comentario } from "./Comentario";
import { useRouter } from "next/router";
import { gerirLista } from "../services/utilizador";
import { toast } from "react-toastify";

export function SerieCompleta({ serie }) {

  const { userLogado, setUserLogado } = userStore((state) => state)
  const router = useRouter()

  const [botaoIsClicked, setBotaoIsClicked] = useState({
    verMais: userLogado.conteudoPorVer.find(ele => ele.id === serie._id),
    visto: userLogado.conteudoVisto.find(ele => ele.id === serie._id),
    favorito: userLogado.conteudoFavorito.find(ele => ele.id === serie._id),
  })

  const [desativar, setDesativar] = useState({
    verMais: false,
    visto: false,
    favorito: false,
  })

  const [comentarios, setComentarios] = useState({
    ver: false,
    comentarios: []
  })


  function handleClick() {
    router.back()
  }

  async function handleClickBotao(booleano, botao, conteudo) {

    const res = await gerirLista(booleano, serie._id, userLogado._id, "serie", botao)

    if (res.ok) {

      if (booleano) {
        setUserLogado(
          {
            ...userLogado,
            [conteudo]: [...[conteudo], `${serie._id}`]
          }
        )
      } else {
        setUserLogado(
          {
            ...userLogado,
            [conteudo]: (userLogado[conteudo].filter((id) => id !== serie._id))
          }
        )

      }

      toggleBotao(booleano, botao)

      toast.success(`${booleano ? "Adicionado à" : "Removido da"} lista ${botao === "porVer" ? "por ver!" : botao === "favorito" ? "de favoritos" : "visto!"} com sucesso!`)
    } else {
      toast.error("Algo correu mal!")
    }

    setDesativar((ps) => ({ ...ps, [botao]: true }))

    setTimeout(() => {
      setDesativar((ps) => ({ ...ps, [botao]: false }));
    }, 500);
  }

  function handleComentarios() {
    setComentarios((ps) => ({ ...ps, ver: !ps.ver }))
  }

  function toggleBotao(booleano, botao) {
    setBotaoIsClicked((ps) => ({ ...ps, [botao]: booleano }))
  }



  useEffect(() => {

    async function fetchDadosComentarios() {
      if (serie.comentarios.length > 0) {
        const dados = await fetchComentariosSerie(serie._id)
        setComentarios((ps) => ({ ...ps, comentarios: dados }))
      }
    }
    fetchDadosComentarios()

  }, [])

  return (
    <div className="flex flex-col md:max-w-96 min-h-screen h-full bg-fundo-principal">
      <Link href={""} onClick={handleClick}>
        <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
      </Link>
      <div className="flex mt-5">
        <div className="flex justify-center ">
          <Image
            className="ml-5 object-cover w-40 h-60"
            src={serie.capa}
            width="80"
            height="80"
          />
        </div>
        <div className="flex-grow ml-5 mr-1">
          <h2 className="text-sm leading-6 text-main-white font-semibold">
            {serie.titulo}
          </h2>
          <h2 className="text-sm leading-6 text-main-white font-medium">
            {serie.tituloOriginal}
          </h2>
          <h3 className="text-sm leading-6 text-main-white">
            {serie.generos.map((ele, index) =>
              index < serie.generos.length - 1 ? ele + "/" : ele
            )}
          </h3>
          <h3 className="text-sm leading-6 text-main-white">
            Data de Lançamento:{" "}
            {moment(serie.dataLancamento).format("DD/MM/YYYY")}
          </h3>
          <p className="text-sm leading-6 text-main-white">
            Temporadas: {Object.keys(serie.temporadas).length}
          </p>
          <p className="text-sm leading-6 text-main-white">
            {serie.classificacaoEtaria}
          </p>
          <p className="text-sm leading-6 text-main-white">
            Classificação: {serie.mediaAvaliacoes}
          </p>
          <div className="flex items-center justify-end gap-3 mr-10 mt-3">
            <button
              onClick={() => handleClickBotao(!botaoIsClicked.visto, "visto", "conteudoVisto")}
              disabled={desativar.visto}>
              <img src={`/icones/visto${botaoIsClicked.visto ? "-pintado" : ""}.png`}
                className="w-7 h-7"></img>

            </button>

            <button
              onClick={() => handleClickBotao(!botaoIsClicked.verMais, "porVer", "conteudoPorVer")}
              disabled={desativar.verMais}>
              <img src={`/icones/ver-mais${botaoIsClicked.verMais ? "-pintado" : ""}.png`}
                className="w-7 h-7"></img>

            </button>

            <button
              onClick={() => handleClickBotao(!botaoIsClicked.favorito, "favorito", "conteudoFavorito")}
              disabled={desativar.favorito}>
              <img src={`/icones/favorito${botaoIsClicked.favorito ? "-pintado" : ""}.png`}
                className="w-7 h-7"></img>

            </button>



          </div>
        </div>
      </div>
      <Link href={serie.trailer}>
        <div className="flex items-center justify-start gap-1">
          <span className="text-main-white ml-7 text-xs">Ver trailer</span>
          <span href={serie.trailer}>
            <img src="/icones/YouTube.png" alt="Ver trailer"></img>
          </span>
        </div>
      </Link>

      <div className="bg-fundo-principal flex flex-col items-left ml-5 mr-5">
        <h4 className="text-main-white mt-3 font-semibold">Sinopse:</h4>
        <p className="text-main-white mt-1">{serie.sinopse}</p>
        <h4 className="text-main-white mt-3 font-semibold">Elenco:</h4>
        <p className="text-main-white mt-1">
          {serie.elenco.map((ator, i) => (
            <span key={i}>
              {ator.nome}
              {i < serie.elenco.length - 1 && " / "}
            </span>
          ))}
        </p>
        <h4 className="text-main-white mt-3 font-semibold">Realizador:</h4>
        <p className="text-main-white mt-1">{serie.realizador.nome}</p>
        <div className="mt-3">
          {serie.temporadas.map((temporada, i) => (
            <div key={i}>
              <p className="font-semibold text-main-white mt-1 ml-2">
                <TemporadaCard nTemporada={i + 1} temporada={temporada} />
              </p>
              {/* <div className="flex flex-wrap gap-2 ml-2">
                {temporada.map((episodio, index2) => (
                  <div>
                    <EpisodioSerie
                      key={index2}
                      numero={index2 + 1}
                      titulo={episodio.titulo}
                      descricao={episodio.descricao}
                    />
                  </div>
                ))}
              </div> */}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="flex items-center mt-3 border border-laranja-principal rounded-lg  content-center">
            <button className=" w-96 h-10 text-main-white font-semibold ml-5 text-left" onClick={handleComentarios}>
              Comentários
            </button>
            <img src="/icones/dropdown.png" className="mr-2 h-6"></img>
          </div>

          <div className="">
            {comentarios.ver ?
              comentarios.comentarios.length > 0 ?

                comentarios.comentarios.map((ele) =>
                  <div className="border border-laranja-principal rounded-xl w-80 h-16 ml-7 mb-4 mt-4">
                    {/* <div className="border border-laranja-principal rounded-xl w-80 h-12 ml-10 mb-4"> */}
                    <Comentario comentario={ele} />
                  </div>)

                : <div className="border border-laranja-principal rounded-xl w-80 h-14 ml-10 mb-4 mt-4">
                  <h1 className="text-main-white text-center pt-3">Esta série ainda não tem comentários!</h1>
                </div>

              : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
