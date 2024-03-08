import { ObjectId } from "mongodb"
import { updateOneDocument } from "./mongodb"
import { encontrarIdArrayObjetos, filtrarArray, filtrarArrayObjetos } from "../services/util"
import { getListaVistoUtilizador, getListaPorVerUtilizador, getListaFavoritosUtilizador } from "./utilizador"

const defaultCollection = "utilizadores"

export async function adicionarLista(conteudo, lista) {

    console.log("conteudo, lista")
    console.log(conteudo, lista)

    if (conteudo.episodio) {
        return await adicionarEpisodio(conteudo)
    }

    switch (lista) {
        case "visto":
            return await adicionarListaVisto(conteudo)

        case "favorito":
            return await adicionarListaFavoritos(conteudo)

        case "porVer":
            return await adicionarListaPorVer(conteudo)

        default:
            return "Inválido"
    }
}

export async function removerLista(conteudo, lista) {

    if (conteudo.episodio) {
        return await removerEpisodio(conteudo)
    }

    switch (lista) {
        case "visto":
            await removerListaVisto(conteudo)
            break;

        case "favorito":
            await removerListaFavoritos(conteudo)
            break;

        case "porVer":
            return await removerListaPorVer(conteudo)

        default:
            return "Inválido"
    }
}

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

    if (!listaPorVer.conteudoPorVer.find((ele) => ele.id === conteudoParaAdicionar.id)) {


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
    return
}

export async function adicionarListaFavoritos(conteudo) {

    const filter = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaFavoritos = await getListaFavoritosUtilizador(filter)

    const conteudoParaAdicionar = {
        tipo: conteudo.idFilme ? "filme" : "serie",
        id: conteudo.idFilme ?? conteudo.idSerie
    }

    if (!listaFavoritos.conteudoFavorito.find((ele) => ele.id === conteudoParaAdicionar.id)) {

        const novaLista = {
            $set:
                { conteudoFavorito: [conteudoParaAdicionar, ...listaFavoritos.conteudoFavorito] }
        }

        const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

        return atualizar
    }

    return
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
            { conteudoPorVer: filtrarArrayObjetos(listaPorVer.conteudoPorver, conteudo.idFilme ?? conteudo.idSerie) }
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


    if (!serie.episodiosVistos.includes(conteudo.episodio)) {
        serie.episodiosVistos = [...serie.episodiosVistos, conteudo.episodio].sort()


        const novaLista = {
            $set:
                { conteudoPorVer: [serie, ...filtrarArrayObjetos(listaPorVer.conteudoPorVer, conteudo.idSerie)] }
        }

        const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

        return atualizar
    }

    return
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

