import { ObjectId } from "mongodb"
import { getMongoCollection, updateOneDocument } from "./mongodb"

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

    const listaVisto = await getListaPorVerUtilizador(filter)

    const novaLista = {
        $set:
            { "conteudoPorVer.filmes": [...listaVisto.conteudoPorVer.filmes, conteudo.idFilme] }
    }

    const atualizar = await updateOneDocument(filter, novaLista, defaultCollection)

    return atualizar


}

export async function adicionarFilmeFavorito(conteudo) {



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