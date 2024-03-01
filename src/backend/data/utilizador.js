import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, insertDocument, replaceDocument, updateOneDocument } from "./mongodb"
import { filtrarInformacaoPerfil } from "../services/utilizador";

const defaultCollection = "utilizadores"

export async function addUserToCollection(user) {

    const userToAdd = {
        nome: user.nome,
        email: user.email,
        password: user.password,
        conteudoVisto: {
            filmes: [],
            series: []
        },
        conteudoPorVer: {
            filmes: [],
            series: []
        },
        conteudoFavorito: [{
            tipo: "",
            id: ""
        }],
        historicoComentarios: [],
        seguidores: [],
        quemSegue: [],
        privado: false,
        admin: false,
        estatisticas: {
            filmes: {
                quantidade: 0,
                tempo: 0,
                generos: 0
            },
            series: {
                quantidade: 0,
                tempo: 0,
                generos: 0
            }
        },
        imagemPerfil: "https://lh3.googleusercontent.com/drive-viewer/AKGpihb9iHsw_mmv03fXeFQGKpGqAXkhNKv770U3y2fDwQN61jIp2bwhNt2HDPQzO3bl26EdGdfE7Y9J98z3_4ARI6LnZhzYtg=s1600",
        dataRegisto: new Date().getTime()
    }

    return await insertDocument(userToAdd, defaultCollection)
}

export async function updateUserInCollection(filter, registeredUser) {

    return await replaceDocument(filter, registeredUser, defaultCollection)
}

export async function findEmailInCollection(email) {

    const filter = { email }


    return await findOneDocument(filter, defaultCollection)
}

export async function findUserInCollection(id) {

    const filter = { _id: new ObjectId(id) }
    const utilizador = await findOneDocument(filter, defaultCollection)

    if (utilizador === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    const utilizadorFiltrado = filtrarInformacaoPerfil(utilizador)

    return {
        mensagem: "Sucesso.",
        utilizadorFiltrado
    }
}

export async function adicionarComentarioHistoricoUtilizador(comentario) {

    const filter = { _id: new ObjectId(comentario.idUtilizador) }

    const utilizador = await getHistoricoComentariosUtilizador(filter)

    const novoHistorico = {
        $set:
            { historicoComentarios: [...utilizador.historicoComentarios, comentario.idComentario] }
    }

    const atualizar = await updateOneDocument(filter, novoHistorico, defaultCollection)

    return atualizar

}

async function getHistoricoComentariosUtilizador(filter) {

    const projection = { historicoComentarios: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}


export async function adicionarSeguidor(seguir) {

    const filterSeguir = { _id: new ObjectId(seguir.quemSeguir) }
    const filterQuemSegue = { _id: new ObjectId(seguir.novoSeguidor) }

    const seguidores = await getSeguidoresUtilizador(filterSeguir)
    const quemSegue = await getQuemSegueUtilizador(filterQuemSegue)

    const novoSeguidores = {
        $set:
            { seguidores: [...seguidores.seguidores, seguir.novoSeguidor] }
    }

    const novoQuemSegue = {
        $set:
            { quemSegue: [...quemSegue.quemSegue, seguir.quemSeguir] }
    }

    const atualizar = {
        atualizarSeguidores: await updateOneDocument(filterSeguir, novoSeguidores, defaultCollection),
        atualizarQuemSegue: await updateOneDocument(filterQuemSegue, novoQuemSegue, defaultCollection)
    }

    return atualizar

}

async function getSeguidoresUtilizador(filter) {

    const projection = { seguidores: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}

async function getQuemSegueUtilizador(filter) {

    const projection = { quemSegue: 1, _id: 0 }

    const collection = await getMongoCollection(defaultCollection)
    return await collection?.findOne(filter, { projection })
}






//* Modelo adicionar user

// const userToAdd = {
//     nome: user.nome,
//     email: user.email,
//     password: user.password,
//     conteudoVisto: {
//         filmes: [],
//         series: []
//     },
//     conteudoPorVer: {
//         filmes: [],
//         series: []
//     },
//     conteudoFavorito: [{
//         tipo: "",
//         id: ""
//     }],
//     historicoComentarios: [],
//     seguidores: [],
//     quemSegue: [],
//     privado: false,
//     admin: false,
//     estatisticas: {
//         filmes: {
//             quantidade: 0,
//             tempo: 0,
//             generos: 0
//         },
//         series: {
//             quantidade: 0,
//             tempo:0,
//             generos: 0
//         }
//     },
//     imagemPerfil: "https://lh3.googleusercontent.com/drive-viewer/AKGpihb9iHsw_mmv03fXeFQGKpGqAXkhNKv770U3y2fDwQN61jIp2bwhNt2HDPQzO3bl26EdGdfE7Y9J98z3_4ARI6LnZhzYtg=s1600",
//     dataRegisto: new Date().getTime()
// }