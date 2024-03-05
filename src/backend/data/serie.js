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


export async function getDuracaoGeneroSerie(id) {

    const filter = { _id: new ObjectId(id) }


    const projection = {
        duracao: 1,
        genero: 1,
        temporadas: 1,
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

export async function getSerieAleatoria() {

    const collection = await getMongoCollection(defaultCollection)
    const serie = {
        serie: await collection?.aggregate([
            {
                $project: {
                    _id: 1,
                    capa: 1
                }
            },
            {
                $sample: { size: 1 }
            }
        ]).toArray()
    }

    console.log("serie")
    console.log(serie.serie[0])


    return serie.serie[0]
}