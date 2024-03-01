import { ObjectId } from "mongodb"
import { getMongoCollection, updateOneDocument } from "./mongodb"

const defaultCollection = "utilizadores"


export async function adicionarFilmeVisto(conteudo) {

    const filterQuemViu = { _id: new ObjectId(conteudo.idUtilizador) }

    const listaVisto = await getListaVistoUtilizador(filterQuemViu)

    console.log(listaVisto)

    const novaLista = {
        $set:
            { "conteudoVisto.filmes": [...listaVisto.filmes, conteudo.idFilme] }
    }

    const atualizar = await updateOneDocument(filterQuemViu, novaLista, defaultCollection)

    return atualizar

}

export async function adicionarFilmePorVer(conteudo) {



}

async function getListaVistoUtilizador(filter) {

    const projection = {
        conteudoVisto: 1, _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

async function getListaPorVerUtilizador(filter) {

    const projection = { "conteudoPorVer.filmes": 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, projection)
}