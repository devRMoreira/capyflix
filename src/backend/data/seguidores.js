import { ObjectId } from "mongodb"
import { getQuemSegueUtilizador, getSeguidoresUtilizador, getUserAvatarName } from "./utilizador"

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

export async function getListaSeguidores(id) {

    const filter = { _id: new ObjectId(id) }

    const lista = await getSeguidoresUtilizador(filter)

    const novaLista = await adicionarAvatarNome(lista.seguidores)

    return novaLista
}

export async function getListaQuemSegue(id) {

    const filter = { _id: new ObjectId(id) }

    const lista = await getQuemSegueUtilizador(filter)

    const novaLista = await adicionarAvatarNome(lista.quemSegue)

    return novaLista
}

async function adicionarAvatarNome(arrayId) {

    let novoArray = []
    for (let i = 0; i < arrayId.length; i++) {
        novoArray.push(await getUserAvatarName(arrayId[i]))
    }

    return novoArray

}