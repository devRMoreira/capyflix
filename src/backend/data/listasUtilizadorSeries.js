import { ObjectId } from "mongodb"
import { getMongoCollection, updateOneDocument } from "./mongodb"
import { encontrarIdArrayObjetos, filtrarArray, filtrarArrayObjetos } from "../services/util"

const defaultCollection = "utilizadores"


export async function adicionarSerieVisto(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filter)

    const serieParaAdicionar = {
        id: conteudo.idSerie,
        visualizado: new Date().getTime()
    }

    const novaLista = {
        $set:
            { "conteudoVisto.series": [serieParaAdicionar, ...listaVisto.conteudoVisto.series] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function adicionarSeriePorVer(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const seriePorVer = {
        id: conteudo.idSerie,
        episodiosVistos: []
    }

    const novaLista = {
        $set:
            { "conteudoPorVer.series": [seriePorVer, ...listaPorVer.conteudoPorVer.series] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function adicionarSerieFavorito(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)

    const serieParaAdicionar = {
        tipo: "serie",
        id: conteudo.idSerie
    }

    const novaLista = {
        $set:
            { conteudoFavorito: [serieParaAdicionar, ...listaFavoritos.conteudoFavorito] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function removerSerieVisto(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filter)

    const novaLista = {
        $set:
            { "conteudoVisto.series": filtrarArrayObjetos(listaVisto.conteudoVisto.series, conteudo.idSerie) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function removerSeriePorVer(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const novaLista = {
        $set:
            { "conteudoPorVer.series": filtrarArray(listaPorVer.conteudoPorVer.series, conteudo.idSerie) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function removerSerieFavorito(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)

    const novaLista = {
        $set:
            { conteudoFavorito: filtrarArrayObjetos(listaFavoritos.conteudoFavorito, conteudo.idSerie) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function adicionarEpisodio(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const serie = encontrarIdArrayObjetos(listaPorVer.conteudoPorVer.series, conteudo.idSerie)

    serie.episodiosVistos = [...serie.episodiosVistos, conteudo.episodio]

    const novaLista = {
        $set:
            { "conteudoPorVer.series": [serie, ...filtrarArrayObjetos(listaPorVer.conteudoVisto.series)] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar
}

export async function removerEpisodio(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const serie = encontrarIdArrayObjetos(listaPorVer.conteudoPorVer.series, conteudo.idSerie)

    serie.episodiosVistos = filtrarArray(serie.episodiosVistos, conteudo.episodio)

    const novaLista = {
        $set:
            { "conteudoPorVer.series": [serie, ...filtrarArrayObjetos(listaPorVer.conteudoVisto.series)] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar
}




async function getListaVistoUtilizador(filter) {

    const projection = {
        "conteudoVisto.series": 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

async function getListaPorVerUtilizador(filter) {

    const projection = {
        "conteudoPorVer.series": 1,
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