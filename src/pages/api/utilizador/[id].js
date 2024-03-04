import { adicionarSeguidor, alterarPassword, alterarTipoPerfil, findUserInCollection, getCapasFavoritos, getCapasPorVer, getCapasVisto, removerSeguidor } from "@/backend/data/utilizador"
import { passwordEncryption } from "@/backend/services/utilizador"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        if (req.body.lista === "visto") {

            const listaVisto = await getCapasVisto(id)

            return res.status(200).json(listaVisto)

        } else if (req.body.lista === "porVer") {

            const listaPorVer = await getCapasPorVer(id)

            return res.status(200).json(listaPorVer)

        } else if (req.body.lista === "favorito") {

            const listaFavorito = await getCapasFavoritos(id)

            return res.status(200).json(listaFavorito)

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

        } else if (req.body.privado) {

            const utilizador = req.query.id

            const alterado = await alterarTipoPerfil(utilizador)

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