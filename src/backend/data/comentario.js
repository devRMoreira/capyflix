import { ObjectId } from "mongodb";
import { findDocuments, findOneDocument, getMongoCollection, insertDocument } from "./mongodb";
import { adicionarComentarioHistoricoUtilizador, findUserInCollection, getUserAvatar, getUserAvatarName } from "./utilizador";
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

    const comentarioComInfo = await adicionarImagemPerfilNome(comentario)


    return {
        mensagem: "Sucesso.",
        comentarioComInfo
    }
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

export async function getTodasAvaliacoes(arrayIdComentarios) {

    let filter = {
        _id: {
            $in: arrayIdComentarios
        }
    }

    const projection = { avaliacao: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.find(filter, { projection }).toArray()
}

export async function adicionarImagemPerfilNome(comentario) {

    const imagemPerfilNome = await getUserAvatarName(comentario.utilizador)

    return {
        ...comentario,
        imagemPerfil: imagemPerfilNome.imagemPerfil,
        nome: imagemPerfilNome.nome
    }
}


export async function obterComentario(id) {

    const filter = id
    const comentario = await findOneDocument(filter, defaultCollection)

    const comentarioComInfo = await adicionarImagemPerfilNome(comentario)


    return comentarioComInfo

}

// * Modelo novo comentário
// {
//     comentario : "",
//     avaliacao : 1,
//     utilizador : ""
//     data: new Date().getTime()
// }

// async function adicionarImagemPerfil(comentarios) {

//     let atualizar = []

//     for (let i = 0; i < comentarios.length; i++) {

//         const imagemPerfil = await getUserAvatar(comentarios[i].utilizador)
//         atualizar.push({ ...comentarios[i], imagemPerfil: imagemPerfil.imagemPerfil })
//     }

//     return atualizar
// }

// export async function getTodosComentarios(conteudo) {

//     let filter = { _id: new ObjectId(conteudo.id) }
//     let arrayIdComentarios

//     if (conteudo.tipo === "filme") {
//         arrayIdComentarios = await getComentariosFilme(filter)

//     } else {
//         arrayIdComentarios = await getComentariosSerie(filter)


//     }

//     filter = {
//         _id: {
//             $in: arrayIdComentarios.comentarios
//         }
//     }

//     const comentarios = await findDocuments(filter, defaultCollection)

//     const comentariosComImagem = await adicionarImagemPerfil(comentarios)

//     return comentariosComImagem

// }

