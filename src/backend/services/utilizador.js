const { fromString } = require("uuidv4")

export function passwordEncryption(password) {
    return fromString(password)
}

export function filtrarInformacaoPerfil(utilizador) {

    const utilizadorFiltrado = {
        _id: utilizador._id,
        nome:utilizador.nome,
        conteudoVisto: utilizador.conteudoVisto,
        conteudoPorVer: utilizador.conteudoPorVer,
        conteudoFavorito: utilizador.conteudoFavorito,
        seguidores: utilizador.seguidores,
        quemSegue: utilizador.quemSegue,
        privado: utilizador.privado,
        estatisticas: utilizador.estatisticas,
        imagemPerfil: utilizador.imagemPerfil,
        dataRegisto: utilizador.dataRegisto  
    }

    return utilizadorFiltrado
}




