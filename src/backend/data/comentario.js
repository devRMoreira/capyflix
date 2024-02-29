import { ObjectId } from "mongodb";
import { findOneDocument, insertDocument } from "./mongodb";
import { adicionarComentarioHistoricoUtilizador, findEmailInCollection, findUserInCollection } from "./utilizador";

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

    if (await findUserInCollection(comentario.utilizador)) {

        const comentarioParaAdicionar = {
            ...comentario,
            data: new Date().getTime()
        }

        const comentarioAdicionado = await insertDocument(comentarioParaAdicionar, defaultCollection)
        console.log(comentarioAdicionado)

        const adicionarHistorico = {
            idComentario: comentarioAdicionado.insertedId,
            idUtilizador: comentarioParaAdicionar.utilizador

        }
        const historicoAdicionado = await adicionarComentarioHistoricoUtilizador(adicionarHistorico)

        return {
            mensagem: "Comentario efetuado com sucesso!",
            id: comentarioAdicionado.insertedId
        }

    } else {
        return {
            mensagem: "Pedido inválido."
        }
    }
}




// * Modelo novo comentário
// {
//     comentario : "",
//     avaliacao : 1,
//     utilizador : ""
//     data: new Date().getTime()
// }