import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, updateOneDocument } from "./mongodb";

const defaultCollection = "filmes"

export async function findFilme(id) {
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