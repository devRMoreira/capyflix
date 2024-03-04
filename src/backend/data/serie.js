import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, updateOneDocument } from "./mongodb";

const defaultCollection = "series"

export async function getSerie(id) {
    const filter = { _id: new ObjectId(id) }
    const serie = await findOneDocument(filter, defaultCollection)

    if (serie === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    return {
        mensagem: "Sucesso.",
        serie
    }
}

export async function adicionarComentarioSerie(idSerie, idComentario) {

    const filter = { _id: new ObjectId(idSerie) }

    const serie = await getComentariosSerie(filter)

    const novoHistorico = {
        $set:
            { comentarios: [...serie.comentarios, idComentario] }
    }

    const atualizar = await updateOneDocument(filter, novoHistorico, defaultCollection)

    return atualizar

}


async function getComentariosSerie(filter) {

    const projection = { comentarios: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

export async function getCapaSerie(id) {

    const filter = { _id: new ObjectId(id) }
    const projection = { capa: 1 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })

}