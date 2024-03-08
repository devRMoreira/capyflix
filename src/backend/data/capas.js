import { ObjectId } from "mongodb";
import { getListaFavoritosUtilizador, getListaPorVerUtilizador, getListaVistoUtilizador } from "./utilizador";
import { getMongoCollection } from "./mongodb";

const colecaoFilmes = "filmes"
const colecaoSeries = "series"

export async function getCapas(id, lista) {

    switch (lista) {
        case "visto":
            return await getCapasListaVisto(id)

        case "porVer":
            return await getCapasListaPorVer(id)

        case "favorito":
            return await getCapasListaFavoritos(id)

        default:
            return "Inválido"
    }
}

async function getCapasListaVisto(id) {

    const filter = { _id: new ObjectId(id) }

    const lista = await getListaVistoUtilizador(filter)

    const capas = []

    for (const ele of lista.conteudoVisto) {

        let capa

        if (ele.tipo === "filme") {
            capa = await getCapaFilme(ele.id)
        }

        if (ele.tipo === "serie") {
            capa = await getCapaSerie(ele.id)
        }

        if (capa) {
            capas.push(capa)
        }
    }

    return capas
}

async function getCapasListaPorVer(id) {

    const filter = { _id: new ObjectId(id) }

    const lista = await getListaPorVerUtilizador(filter)

    const capas = []

    for (const ele of lista.conteudoPorVer) {

        let capa

        if (ele.tipo === "filme") {
            capa = await getCapaFilme(ele.id)
        }

        if (ele.tipo === "serie") {
            capa = await getCapaSerie(ele.id)
        }

        if (capa) {
            capas.push(capa)
        }
    }

    return capas
}

async function getCapasListaFavoritos(id) {

    const filter = { _id: new ObjectId(id) }

    const lista = await getListaFavoritosUtilizador(filter)

    const capas = []

    for (const ele of lista.conteudoFavorito) {

        let capa

        if (ele.tipo === "filme") {
            capa = await getCapaFilme(ele.id)
        }

        if (ele.tipo === "serie") {
            capa = await getCapaSerie(ele.id)
        }

        if (capa) {
            capas.push(capa)
        }
    }

    return capas
}

export async function getCapaSerie(id) {

    const filter = { _id: new ObjectId(id) }
    const projection = { capa: 1, tipo: "serie" }

    const collection = await getMongoCollection(colecaoSeries)
    return await collection?.findOne(filter, { projection })

}

export async function getCapaFilme(id) {

    const filter = { _id: new ObjectId(id) }
    const projection = { capa: 1, tipo: "filme" }

    const collection = await getMongoCollection(colecaoFilmes)
    return await collection?.findOne(filter, { projection })

}