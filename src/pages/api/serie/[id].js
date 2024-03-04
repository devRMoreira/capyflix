import { adicionarEpisodio, adicionarSerieFavorito, adicionarSeriePorVer, adicionarSerieVisto, removerEpisodio, removerSerieFavorito, removerSeriePorVer, removerSerieVisto } from "@/backend/data/listasUtilizadorSeries"
import { findSerie } from "@/backend/data/serie"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const serie = await findSerie(id)

        if (serie.mensagem.includes("Sucesso")) {
            return res.status(200).json(serie)
        } else {
            return res.status(403).json(serie)
        }

    } else if (req.method === "PATCH") {

        if (req.query.id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const conteudo = {
            idSerie: req.query.id,
            idUtilizador: req.body.idUtilizador
        }


        if (req.body.lista === "visto") {

            const adicionado = await adicionarSerieVisto(conteudo)

            return res.status(200).json(adicionado)

        } else if (req.body.lista === "porVer") {

            if (!req.body.episodio) {

                const adicionado = await adicionarSeriePorVer(conteudo)

                return res.status(200).json(adicionado)

            } else {

                conteudo.episodio = req.body.episodio

                const adicionado = await adicionarEpisodio(conteudo)

                return res.status(200).json(adicionado)

            }


        } else if (req.body.lista === "favorito") {

            const adicionado = await adicionarSerieFavorito(conteudo)

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
            idSerie: req.query.id,
            idUtilizador: req.body.idUtilizador
        }


        if (req.body.lista === "visto") {

            const removido = await removerSerieVisto(conteudo)

            return res.status(200).json(removido)

        } else if (req.body.lista === "porVer") {

            if (!req.body.episodio) {

                const adicionado = await removerSeriePorVer(conteudo)

                return res.status(200).json(adicionado)

            } else {

                conteudo.episodio = req.body.episodio

                const adicionado = await removerEpisodio(conteudo)

                return res.status(200).json(adicionado)

            }


        } else if (req.body.lista === "favorito") {

            const removido = await removerSerieFavorito(conteudo)

            return res.status(200).json(removido)

        } else {

            return res.status(404).json(undefined)

        }


    } else {
        return res.status(404).json(undefined)
    }
}