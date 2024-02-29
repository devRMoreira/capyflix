import { ObjectId } from "mongodb";
import { findOneDocument } from "./mongodb";

const defaultCollection = "comentarios"

export async function findComentario(id) {
    const filter = { _id: new ObjectId(id) }
    const comentario = await findOneDocument(filter, defaultCollection)

    if (comentario === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    return {
        mensagem: "Sucesso.",
        comentario
    }
}

export async function adicionarNovoComentario(comentario) {

    const comentarioParaAdicionar = {
        ...comentario,
        data: new Date().getTime()
    }

    const comentarioAdicionado = await insertDocument(comentarioParaAdicionar, defaultCollection)

    return {
        mensagem: "Comentario efetuado com sucesso!",
        _id: comentarioAdicionado.insertedId
    }

}

// * Modelo novo comentário
// {
//     comentario : "",
//     avaliacao : 1,
//     utilizador : ""
//     data: new Date().getTime()
// }