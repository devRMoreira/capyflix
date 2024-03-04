import { ObjectId } from "mongodb"
import { getMongoCollection, updateOneDocument } from "./mongodb"
import { encontrarIdArrayObjetos, filtrarArray, filtrarArrayObjetos } from "../services/util"
import { getListaFavoritosUtilizador } from "./utilizador"

const defaultCollection = "utilizadores"

export async function adicionarListaVisto(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filter)

    const conteudoParaAdicionar = {
        tipo: conteudo.idFilme ? "filme" : "serie",
        id: conteudo.idFilme ?? conteudo.idSerie,
        visualizado: new Date().getTime()
    }

    const novaLista = {
        $set:
            { conteudoVisto: [conteudoParaAdicionar, ...listaVisto.conteudoVisto] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function adicionarListaPorVer(conteudo) {



    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)


    const conteudoParaAdicionar = {
        tipo: conteudo.idFilme ? "filme" : "serie",
        id: conteudo.idFilme ?? conteudo.idSerie,
    }

    if (conteudo.idSerie) {
        conteudoParaAdicionar.episodiosVistos = []
    }

    const novaLista = {
        $set:
            { conteudoPorVer: [conteudoParaAdicionar, ...listaPorVer.conteudoPorVer] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar
}

export async function adicionarListaFavoritos(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)


    const conteudoParaAdicionar = {
        tipo: conteudo.idFilme ? "filme" : "serie",
        id: conteudo.idFilme ?? conteudo.idSerie
    }

    const novaLista = {
        $set:
            { conteudoFavorito: [conteudoParaAdicionar, ...listaFavoritos.conteudoFavorito] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function removerListaVisto(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filter)

    const novaLista = {
        $set:
            { conteudoVisto: filtrarArrayObjetos(listaVisto.conteudoVisto, conteudo.idFilme ?? conteudo.idSerie) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function removerListaPorVer(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const novaLista = {
        $set:
            { conteudoPorVer: filtrarArrayObjetos(listaVisto.conteudoVisto, conteudo.idFilme ?? conteudo.idSerie) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar
}

export async function removerListaFavoritos(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)

    const novaLista = {
        $set:
            { conteudoFavorito: filtrarArrayObjetos(listaFavoritos.conteudoFavorito, conteudo.idFilme ?? conteudo.idSerie) }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar

}

export async function adicionarEpisodio(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const serie = encontrarIdArrayObjetos(listaPorVer.conteudoPorVer, conteudo.idSerie)

    serie.episodiosVistos = [...serie.episodiosVistos, conteudo.episodio].sort()

    const novaLista = {
        $set:
            { conteudoPorVer: [serie, ...filtrarArrayObjetos(listaPorVer.conteudoPorVer, conteudo.idSerie)] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar
}


export async function removerEpisodio(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaPorVer = await getListaPorVerUtilizador(filter)

    const serie = encontrarIdArrayObjetos(listaPorVer.conteudoPorVer, conteudo.idSerie)

    serie.episodiosVistos = filtrarArray(serie.episodiosVistos, conteudo.episodio)

    const novaLista = {
        $set:
            { conteudoPorVer: [serie, ...filtrarArrayObjetos(listaPorVer.conteudoPorVer, conteudo.idSerie)] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar
}



async function getListaVistoUtilizador(filter) {

    const projection = {
        conteudoVisto: 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

async function getListaPorVerUtilizador(filter) {

    const projection = {
        conteudoPorVer: 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}