import { findFilme } from "@/backend/data/filme"
import { adicionarFilmeFavorito, adicionarFilmePorVer, adicionarFilmeVisto, removerFilmeFavorito, removerFilmePorVer, removerFilmeVisto } from "@/backend/data/listasUtilizadorFilmes"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const filme = await findFilme(id)

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

            const adicionado = await adicionarFilmeVisto(conteudo)

            return res.status(200).json(adicionado)

        } else if (req.body.lista === "porVer") {

            const adicionado = await adicionarFilmePorVer(conteudo)

            return res.status(200).json(adicionado)

        } else if (req.body.lista === "favorito") {

            const adicionado = await adicionarFilmeFavorito(conteudo)

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

            const removido = await removerFilmeVisto(conteudo)

            return res.status(200).json(removido)

        } else if (req.body.lista === "porVer") {

            const removido = await removerFilmePorVer(conteudo)

            return res.status(200).json(removido)

        } else if (req.body.lista === "favorito") {

            const removido = await removerFilmeFavorito(conteudo)

            return res.status(200).json(removido)

        } else {

            return res.status(404).json(undefined)

        }


    } else {
        return res.status(404).json(undefined)
    }
}