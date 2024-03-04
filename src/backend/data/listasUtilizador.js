import { ObjectId } from "mongodb"
import { getMongoCollection, updateOneDocument } from "./mongodb"
import { filtrarArray, filtrarArrayObjetos } from "../services/util"

const defaultCollection = "utilizadores"


export async function adicionarFilmeVisto(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filter)

    const filmeParaAdicionar = {
        id: conteudo.idFilme,
        visualizado: new Date().getTime()
    }

    const novaLista = {
        $set:
            { "conteudoVisto.filmes": [...listaVisto.conteudoVisto.filmes, filmeParaAdicionar] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function adicionarFilmePorVer(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const novaLista = {
        $set:
            { "conteudoPorVer.filmes": [...listaPorVer.conteudoPorVer.filmes, conteudo.idFilme] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function adicionarFilmeFavorito(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)

    const filmeParaAdicionar = {
        tipo: "filme",
        id: conteudo.idFilme
    }

    const novaLista = {
        $set:
            { conteudoFavorito: [...listaFavoritos.conteudoFavorito, filmeParaAdicionar] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function removerFilmeVisto(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filter)

    const novaLista = {
        $set:
            { "conteudoVisto.filmes": filtrarArrayObjetos(listaVisto.conteudoVisto.filmes, conteudo.idFilme) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function removerFilmePorVer(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const novaLista = {
        $set:
            { "conteudoPorVer.filmes": filtrarArray(listaPorVer.conteudoPorVer.filmes, conteudo.idFilme) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function removerFilmeFavorito(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)

    const filmeParaRemover = {
        tipo: "filme",
        id: conteudo.idFilme
    }

    const novaLista = {
        $set:
            { conteudoFavorito: [...listaFavoritos.conteudoFavorito, filmeParaRemover] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}




async function getListaVistoUtilizador(filter) {

    const projection = {
        "conteudoVisto.filmes": 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

async function getListaPorVerUtilizador(filter) {

    const projection = {
        "conteudoPorVer.filmes": 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, projection)
}

async function getListaFavoritosUtilizador(filter) {

    const projection = {
        conteudoFavorito: 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, projection)
}