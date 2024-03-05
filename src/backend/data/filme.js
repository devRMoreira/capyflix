import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, updateOneDocument } from "./mongodb";

const defaultCollection = "filmes"

export async function getFilme(id) {
    const filter = { _id: new ObjectId(id) }
    const filme = await findOneDocument(filter, defaultCollection)

    if (filme === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    return {
        mensagem: "Sucesso.",
        filme
    }
}

export async function adicionarComentarioFilme(idFilme, idComentario) {

    const filter = { _id: new ObjectId(idFilme) }

    const filme = await getComentariosFilme(filter)

    const novoHistorico = {
        $set:
            { comentarios: [...filme.comentarios, idComentario] }
    }

    const atualizar = await updateOneDocument(filter, novoHistorico, defaultCollection)

    return atualizar

}


async function getComentariosFilme(filter) {

    const projection = { comentarios: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

export async function getDuracaoGeneroFilme(id) {

    const filter = { _id: new ObjectId(id) }


    const projection = {
        duracao: 1,
        genero: 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })

}

export async function getGenerosFilmes(arrayIDs){

    const filter = { _id: new ObjectId(id) }

    const projection = {
        genero: 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })

}