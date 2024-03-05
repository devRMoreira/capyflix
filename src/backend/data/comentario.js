import { ObjectId } from "mongodb";
import { findDocuments, findOneDocument, insertDocument } from "./mongodb";
import { adicionarComentarioHistoricoUtilizador, findUserInCollection } from "./utilizador";
import { adicionarComentarioFilme, getComentariosFilme } from "./filme";
import { adicionarComentarioSerie, getComentariosSerie } from "./serie";

const defaultCollection = "comentarios"

export async function getComentario(id) {
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

export async function getTodosComentarios(conteudo) {

    let filter = { _id: new ObjectId(conteudo.id) }
    let arrayIdComentarios

    if (conteudo.tipo === "filme") {
        arrayIdComentarios = await getComentariosFilme(filter)

    } else {
        arrayIdComentarios = await getComentariosSerie(filter)


    }
    
    filter = {
        _id:{
            $in: arrayIdComentarios.comentarios
        }        
    }

    const comentarios = await findDocuments(filter, defaultCollection)

    return comentarios

}

export async function adicionarNovoComentario(comentario) {

    if (await findUserInCollection(comentario.utilizador)) {

        const comentarioParaAdicionar = {
            comentario: comentario.comentario,
            avaliacao: comentario.avaliacao,
            utilizador: comentario.utilizador,
            data: new Date().getTime()
        }

        const comentarioAdicionado = await insertDocument(comentarioParaAdicionar, defaultCollection)

        const adicionarHistorico = {
            idComentario: comentarioAdicionado.insertedId,
            idUtilizador: comentarioParaAdicionar.utilizador
        }

        await adicionarComentarioHistoricoUtilizador(adicionarHistorico)

        if (comentario.tipo === "filme") {

            await adicionarComentarioFilme(comentario.idConteudo, comentarioAdicionado.insertedId)

        } else {

            await adicionarComentarioSerie(comentario.idConteudo, comentarioAdicionado.insertedId)

        }

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