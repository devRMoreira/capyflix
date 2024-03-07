import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, updateOneDocument } from "./mongodb";
import { adicionarInfoUtilizador } from "./utilizador";

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
            { comentarios: [idComentario, ...serie.comentarios] }
    }

    const atualizar = await updateOneDocument(filter, novoHistorico, defaultCollection)

    return atualizar
}

export async function getComentariosSerie(filter) {

    const projection = { comentarios: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

export async function getDuracaoGenerosSerie(id) {

    const filter = { _id: new ObjectId(id) }

    const projection = {
        duracao: 1,
        generos: 1,
        temporadas: 1,
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

    return serie.serie[0]
}

export async function getComentariosTodasSeries(filter, projection) {
    const collection = await getMongoCollection(defaultCollection)
    return await collection?.find(filter, { projection }).toArray()
}

export async function atualizarAvaliacaoMediaSerie(idSerie, media) {
    const filter = { _id: new ObjectId(idSerie) }

    const novaAvaliacao = {
        $set:
            { mediaAvaliacoes: media }

    }

    const atualizar = await updateOneDocument(filter, novaAvaliacao, defaultCollection)

    return atualizar
}

export async function getListaComentariosSerieInfo(id) {
    const filter = { _id: new ObjectId(id) }

    const arrayIdComentarios = await getComentariosSerie(filter)


    const novaLista = await adicionarInfoUtilizador(arrayIdComentarios.comentarios)

    return novaLista
}