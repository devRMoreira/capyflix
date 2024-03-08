import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Comentario } from "./Comentario";
import { userStore } from "@/pages/_app";
import { fetchComentariosFilme } from "../services/filme";
import Link from "next/link";
import { useRouter } from "next/router";


export function FilmeCompleto({ filme }) {
  const [vistoIsClicked, setvistoIsClicked] = useState(false);
  const [verMaisIsClicked, setverMaisIsClicked] = useState(false);
  const [likeIsClicked, setLikeIsClicked] = useState(false);

  const router = useRouter()
  const [comentarios, setComentarios] = useState({
    ver: false,
    comentarios: []
  })

  const { userLogado } = userStore((state) => state)


  const iconeVistoIsClicked = () => {
    setvistoIsClicked(!vistoIsClicked);
  };

  const iconeVerMaisIsClicked = () => {
    setverMaisIsClicked(!verMaisIsClicked);
  };

  const iconeLikeIsClicked = () => {
    setLikeIsClicked(!likeIsClicked);
  };

  function handleComentarios() {
    setComentarios((ps) => ({ ...ps, ver: !ps.ver }))
  }

  function handleClick(){
    router.back()
  }

  useEffect(() => {

    function handleBotoes() {
      setvistoIsClicked(userLogado.conteudoVisto.find(ele => ele.id === filme._id))
      setverMaisIsClicked(userLogado.conteudoPorVer.find(ele => ele.id === filme._id))
      setLikeIsClicked(userLogado.conteudoFavorito.find(ele => ele.id === filme._id))
    }

    async function fetchDadosComentarios() {
      if (filme.comentarios.length > 0) {
        const dados = await fetchComentariosFilme(filme._id)
        setComentarios((ps) => ({ ...ps, comentarios: dados }))
      }
    }
    handleBotoes()
    fetchDadosComentarios()

  }, [])

  return (
    <div className="flex flex-col md:max-w-96 min-h-screen h-full bg-fundo-principal">
      <Link href={""} onClick={handleClick}>
        <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
      </Link>
      <div className="flex mt-5">
        <div className="flex justify-center">
          <Image
            className="ml-5 object-cover w-40 h-60"
            src={filme.capa}
            width="80"
            height="80"
          />
        </div>
        <div className="relative ml-5 mr-1 ">
          <h2 className="text-sm leading-6 text-main-white font-semibold ">
            {filme.titulo}
          </h2>
          <h2 className="text-sm leading-6 text-main-white font-medium">
            {filme.tituloOriginal}
          </h2>
          <h3 className="text-xs leading-6 text-main-white">
            {filme.generos.map((ele, index) =>
              index < filme.generos.length - 1 ? ele + "/" : ele
            )}
          </h3>
          <h3 className="text-sm leading-6 text-main-white">
            Data de Lançamento:{" "}
            {moment(filme.dataLancamento).format("DD/MM/YYYY")}
          </h3>
          <p className="text-sm leading-6 text-main-white">
            Duração: {filme.duracao}min.
          </p>
          <p className="text-sm leading-6 text-main-white">
            {filme.classificacaoEtaria}
          </p>
          <p className="text-sm leading-6 text-main-white">
            Classificação: {filme.mediaAvaliacoes}
          </p>
          <div className="flex items-center justify-end gap-3 mr-10 mt-3">
            <button onClick={iconeVistoIsClicked}>
              {vistoIsClicked ? (
                <img src="/icones/visto-pintado.png" className="w-7 h-7"></img>
              ) : (
                <img src="/icones/visto.png" className=" w-7 h-7"></img>
              )}
            </button>
            <button onClick={iconeVerMaisIsClicked}>
              {verMaisIsClicked ? (
                <img
                  src="/icones/ver-mais-pintado.png"
                  className=" w-7 h-7"
                ></img>
              ) : (
                <img src="/icones/vermais.png" className="w-7 h-7"></img>
              )}
            </button>
            <button onClick={iconeLikeIsClicked}>
              {likeIsClicked ? (
                <img src="/icones/like-pintado.png" className=" w-7 h-7"></img>
              ) : (
                <img src="/icones/like.png" className="w-7 h-7"></img>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-1">
        <p className="text-main-white ml-7 text-xs">Ver trailer</p>
        <a href={filme.trailer}>
          <img src="/icones/YouTube.png" alt="Ver trailer"></img>
        </a>
      </div>

      <div className="bg-fundo-principal flex flex-col items-left ml-5 mr-5">
        <h4 className="text-main-white mt-3 font-semibold">Sinopse:</h4>
        <p className="text-main-white mt-1">{filme.sinopse}</p>
        <h4 className="text-main-white mt-3 font-semibold">Elenco:</h4>
        <p className="text-main-white mt-1">
          {filme.elenco.map((ele, i) => (
            <span>
              {i < filme.elenco.length - 1 ? `${ele.nome} /` : " " + ele.nome}{" "}
            </span>
          ))}
        </p>
        <h4 className="text-main-white mt-3 font-semibold">Realizador:</h4>
        <p className="text-main-white mt-1">{filme.realizador.nome}</p>
      </div>
      <div className="mt-5">
        <div className="flex items-center flex-grow mt-3 border border-laranja-principal rounded-lg w-96 content-center mx-auto">
          <button className=" w-96 h-10 text-main-white font-semibold ml-5 text-left" onClick={handleComentarios}>
            Comentários
          </button>
          <img src="/icones/dropdown.png" className="mr-2 h-6"></img>
        </div>

        <div className="">
          {comentarios.ver ?
            comentarios.comentarios.length > 0 ?

              comentarios.comentarios.map((ele) =>
                <div className="border border-laranja-principal rounded-xl w-80 h-12 ml-10 mb-4 mt-4">
                  {/* <div className="border border-laranja-principal rounded-xl w-80 h-12 ml-10 mb-4"> */}
                  <Comentario comentario={ele} />
                </div>)

              : undefined
            : undefined}
        </div>
      </div>
    </div>
  );
}