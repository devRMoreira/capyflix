import { ObjectId } from "mongodb";
import { findOneDocument, getMongoCollection, insertDocument, replaceDocument, updateOneDocument } from "./mongodb"
import { filtrarInformacaoPerfil } from "../services/utilizador";
import { filtrarArray } from "../services/util";
import { getCapaFilme} from "./filme";
import { getCapaSerie } from "./serie";

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
        conteudoFavorito: [{}],
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

export async function alterarPassword(password) {

    const filter = { _id: new ObjectId(password.idUtilizador) }

    const novaPassword = {
        $set:
            { password: password.novaPassword }
    }

    const atualizar = await updateOneDocument(filter, novaPassword, defaultCollection)

    return atualizar
}

export async function alterarTipoPerfil(utilizador) {

    const filter = { _id: new ObjectId(utilizador) }

    const privado = await getPrivado(filter)

    const novoStatus = {
        $set:
            { privado: !privado.privado }
    }

    const atualizar = await updateOneDocument(filter, novoStatus, defaultCollection)
    console.log(atualizar)

    return atualizar
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

async function getPrivado(filter) {

    const projection = { privado: 1, _id: 0 }

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

export async function removerSeguidor(pararSeguir) {

    const filterPararSeguir = { _id: new ObjectId(pararSeguir.quemNaoSeguir) }
    const filterQuemPara = { _id: new ObjectId(pararSeguir.quemPara) }

    const seguidores = await getSeguidoresUtilizador(filterPararSeguir)
    const quemSegue = await getQuemSegueUtilizador(filterQuemPara)

    const novoSeguidores = {
        $set:
            { seguidores: filtrarArray(seguidores.seguidores, pararSeguir.quemPara) }
    }

    const novoQuemSegue = {
        $set:
            { quemSegue: filtrarArray(quemSegue.quemSegue, pararSeguir.quemNaoSeguir) }
    }

    const atualizar = {
        atualizarSeguidores: await updateOneDocument(filterPararSeguir, novoSeguidores, defaultCollection),
        atualizarQuemPara: await updateOneDocument(filterQuemPara, novoQuemSegue, defaultCollection)
    }

    return atualizar

}

export async function getListaFavoritosUtilizador(filter) {

    const projection = {
        _id: 0,
        conteudoFavorito: 1
    }

    const collection = await getMongoCollection(defaultCollection)
    return await collection.findOne(filter, { projection })
}

export async function getCapas(id) {

    const filter = { _id: new ObjectId(id) }

    const lista = await getListaFavoritosUtilizador(filter)

    const capas = []

    for (const ele of listaFavoritos.conteudoFavorito) {

        let capa

        if (ele.tipo === "filme") {
            capa = await getCapaFilme(ele.id)
        }

        if (ele.tipo === "serie") {
            capa = await getCapaSerie(ele.id)
        }

        if (capa) {
            capas.push(capa)
        }
    }

    console.log(capas)


    return capas


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