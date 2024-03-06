import { getCapaFilme, getCapaSerie, getCapas } from "../data/capas"

const { fromString } = require("uuidv4")

export function passwordEncryption(password) {
    return fromString(password)
}

export async function filtrarInformacaoPerfil(utilizador) {

    const primeiroVisto = utilizador.conteudoVisto[0]
    const primeiroPorVer = utilizador.conteudoPorVer[0]
    const primeiroFavorito = utilizador.conteudoFavorito[0]


    const conteudoVistoCapa = primeiroVisto.tipo === "filme" ? await getCapaFilme(primeiroVisto.id) : await getCapaSerie(primeiroVisto.id)
    const conteudoPorVerCapa = primeiroPorVer.tipo === "filme" ? await getCapaFilme(primeiroPorVer.id) : await getCapaSerie(primeiroPorVer.id)
    const conteudoFavoritoCapa = primeiroFavorito.tipo === "filme" ? await getCapaFilme(primeiroFavorito.id) : await getCapaSerie(primeiroFavorito.id)

    const utilizadorFiltrado = {
        _id: utilizador._id,
        nome: utilizador.nome,
        conteudoVisto: conteudoVistoCapa,
        conteudoPorVer: conteudoPorVerCapa,
        conteudoFavorito: conteudoFavoritoCapa,
        seguidores: utilizador.seguidores,
        quemSegue: utilizador.quemSegue,
        privado: utilizador.privado,
        estatisticas: utilizador.estatisticas,
        imagemPerfil: utilizador.imagemPerfil,
        dataRegisto: utilizador.dataRegisto
    }

    return utilizadorFiltrado
}