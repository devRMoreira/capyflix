import { getCapas } from "@/backend/data/capas"
import { adicionarSeguidor, getListaQuemSegue, getListaSeguidores, removerSeguidor } from "@/backend/data/seguidores"
import { alterarPassword, alterarTipoPerfil, findUserInCollection, getHistoricoComentariosUtilizador, getPrivado } from "@/backend/data/utilizador"
import { passwordEncryption } from "@/backend/services/utilizador"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {

    if (req.method === "GET") {

        const id = req.query.id.slice(0, 24)

        if (req.query.id.includes("privado")) {
            const estado = await getPrivado(id)

            return res.status(200).json(estado)
        }

        if (req.query.id.includes("porVer")) {
            const lista = "porVer"

            const listaCapas = await getCapas(id, lista)

            return res.status(200).json(listaCapas)
        }

        if (req.query.id.includes("visto")) {
            const lista = "visto"

            const listaCapas = await getCapas(id, lista)

            return res.status(200).json(listaCapas)
        }

        if (req.query.id.includes("favorito")) {
            const lista = "favorito"

            const listaCapas = await getCapas(id, lista)

            return res.status(200).json(listaCapas)
        }

        if (req.query.id.includes("seguidores")) {

            const listaSeguidores = await getListaSeguidores(id)

            return res.status(200).json(listaSeguidores)
        }

        if (req.query.id.includes("quemSegue")) {

            const listaQuemSegue = await getListaQuemSegue(id)

            return res.status(200).json(listaQuemSegue)
        }

        if (req.query.id.includes("comentarios")) {

            const listaComentarios = await getHistoricoComentariosUtilizador({ _id: new ObjectId(id) })

            return res.status(200).json(listaComentarios)
        }

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const utilizador = await findUserInCollection(id)

        if (utilizador.mensagem.includes("Sucesso")) {
            return res.status(200).json(utilizador)
        } else {
            return res.status(403).json(utilizador)
        }



    } else if (req.method === "PATCH") {

        if (req.body.novoSeguidor) {

            const seguir = {
                quemSeguir: req.query.id,
                novoSeguidor: req.body.novoSeguidor
            }

            if (seguir.quemSeguir.length !== 24) {
                return res.status(403).json({
                    mensagem: "ID inválido."
                })
            }

            const seguido = await adicionarSeguidor(seguir)

            return res.status(200).json(seguido)

        } else if (req.body.novaPassword) {

            const novaPassword = {
                idUtilizador: req.query.id,
                novaPassword: passwordEncryption(req.body.novaPassword)
            }

            const alterado = await alterarPassword(novaPassword)

            return res.status(200).json(alterado)

        } else if (req.body) {

            const utilizador = req.query.id

            const bool = req.body.priv

            const alterado = await alterarTipoPerfil(utilizador, bool)

            return res.status(200).json(alterado)

        } else {
            return res.status(404).json(undefined)
        }



    } else if (req.method === "DELETE") {

        const pararSeguir = {
            quemNaoSeguir: req.query.id,
            quemPara: req.body.quemPara
        }

        if (pararSeguir.quemNaoSeguir.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const desseguido = await removerSeguidor(pararSeguir)



        return res.status(200).json(desseguido)



    } else {
        return res.status(404).json(undefined)
    }
}