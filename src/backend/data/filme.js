import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, updateOneDocument } from "./mongodb";
import { adicionarImagemPerfilNome, getComentario, obterComentario } from "./comentario";
import { adicionarInfoUtilizador } from "./utilizador";

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
            { comentarios: [idComentario, ...filme.comentarios] }
    }

    const atualizar = await updateOneDocument(filter, novoHistorico, defaultCollection)

    return atualizar
}


export async function getComentariosFilme(filter) {

    const projection = { comentarios: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

export async function getDuracaoGenerosFilme(id) {

    const filter = { _id: new ObjectId(id) }

    const projection = {
        duracao: 1,
        generos: 1,
        _id: 0
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

export async function getFilmeAleatorio() {

    const collection = await getMongoCollection(defaultCollection)
    const filme = {
        filme: await collection?.aggregate([
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

    return filme.filme[0]
}

export async function getComentariosTodosFilmes(filter, projection) {
    const collection = await getMongoCollection(defaultCollection)
    return await collection?.find(filter, { projection }).toArray()
}

export async function atualizarAvaliacaoMediaFilme(idFilme, media) {
    const filter = { _id: new ObjectId(idFilme) }

    const novaAvaliacao = {
        $set:
            { mediaAvaliacoes: media }

    }

    const atualizar = await updateOneDocument(filter, novaAvaliacao, defaultCollection)

    return atualizar
}

export async function getListaComentariosFilmeInfo(id) {
    const filter = { _id: new ObjectId(id) }

    const arrayIdComentarios = await getComentariosFilme(filter)


    const novaLista = await adicionarInfoUtilizador(arrayIdComentarios.comentarios)

    return novaLista
}