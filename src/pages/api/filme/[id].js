import { getFilme } from "@/backend/data/filme"
import { adicionarListaFavoritos, adicionarListaPorVer, adicionarListaVisto, removerListaFavoritos, removerListaPorVer, removerListaVisto } from "@/backend/data/listas"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const filme = await getFilme(id)

        if (filme.mensagem.includes("Sucesso")) {
            return res.status(200).json(filme)
        } else {
            return res.status(403).json(filme)
        }

    } else if (req.method === "PATCH") {

        if (req.query.id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const conteudo = {
            idFilme: req.query.id,
            idUtilizador: req.body.idUtilizador
        }


        if (req.body.lista === "visto") {

            const adicionado = await adicionarListaVisto(conteudo)

            return res.status(200).json(adicionado)

        } else if (req.body.lista === "porVer") {

            const adicionado = await adicionarListaPorVer(conteudo)

            return res.status(200).json(adicionado)

        } else if (req.body.lista === "favorito") {

            const adicionado = await adicionarListaFavoritos(conteudo)

            return res.status(200).json(adicionado)

        } else {

            return res.status(404).json(undefined)

        }


    } else if (req.method === "DELETE") {

        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const conteudo = {
            idFilme: req.query.id,
            idUtilizador: req.body.idUtilizador
        }


        if (req.body.lista === "visto") {

            const removido = await removerListaVisto(conteudo)

            return res.status(200).json(removido)

        } else if (req.body.lista === "porVer") {

            const removido = await removerListaPorVer(conteudo)

            return res.status(200).json(removido)

        } else if (req.body.lista === "favorito") {

            const removido = await removerListaFavoritos(conteudo)

            return res.status(200).json(removido)

        } else {

            return res.status(404).json(undefined)

        }


    } else {
        return res.status(404).json(undefined)
    }
}