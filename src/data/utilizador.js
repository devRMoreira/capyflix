import { findOneDocument, insertDocument } from "./mongodb"

const defaultCollection = "utilizadores"

export async function addUserToCollection(user, collectionName = defaultCollection) {

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
            filmes: 0,
            series: 0
        },
        imagemPerfil: "https://lh3.googleusercontent.com/drive-viewer/AKGpihb9iHsw_mmv03fXeFQGKpGqAXkhNKv770U3y2fDwQN61jIp2bwhNt2HDPQzO3bl26EdGdfE7Y9J98z3_4ARI6LnZhzYtg=s1600",
        dataRegisto: new Date().getTime()
    }

    

    return await insertDocument(userToAdd, collectionName)
}

export async function updateUserInCollection(filter, registeredUser, collectionName = defaultCollection) {
   
    return await updateDocument(filter, registeredUser, collectionName)
}

export async function findUserInCollection(filter){

    return await findOneDocument(filter, defaultCollection)
}







//* Modelo adicionar user

// const utilizador = {
//     nome: "",
//     password: "",
//     email: "",
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
//     historicoComentarios: [""],
//     seguidores: [""],
//     quemSegue: [""],
//     privado: false,
//     admin: false,
//     estatisticas: {
//         filmes: 0,
//         series: 0
//     },
//     imagemPerfil: "https://lh3.googleusercontent.com/drive-viewer/AKGpihb9iHsw_mmv03fXeFQGKpGqAXkhNKv770U3y2fDwQN61jIp2bwhNt2HDPQzO3bl26EdGdfE7Y9J98z3_4ARI6LnZhzYtg=s1600",
//     dataRegisto: new Date().getTime()
// }