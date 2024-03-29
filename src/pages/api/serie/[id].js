import { adicionarLista, removerLista } from "@/backend/data/listas"
import { getListaComentariosSerieInfo, getSerie, getSerieAleatoria } from "@/backend/data/serie"

export default async function handler(req, res) {

    if (req.method === "GET") {

        if (req.query.id === "random") {

            const serie = await getSerieAleatoria()

            return res.status(200).json(serie)
        }

        const id = req.query.id.slice(0, 24)

        if (req.query.id.includes("comentarios")) {

            const lista = await getListaComentariosSerieInfo(id)
            return res.status(200).json(lista)
        }

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const serie = await getSerie(id)

        if (serie.mensagem.includes("Sucesso")) {
            return res.status(200).json(serie.serie)
        } else {
            return res.status(403).json(serie)
        }

    } else if (req.method === "PATCH") {

        if (req.query.id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const lista = req.body.lista

        const conteudo = {
            idSerie: req.query.id,
            idUtilizador: req.body.idUtilizador,
            episodio: req.body.episodio ?? null
        }

        const adicionado = await adicionarLista(conteudo, lista)

        return res.status(200).json(adicionado)


    } else if (req.method === "DELETE") {

        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const lista = req.body.lista

        const conteudo = {
            idSerie: req.query.id,
            idUtilizador: req.body.idUtilizador,
            episodio: req.body.episodio ?? null
        }

        const removido = await removerLista(conteudo, lista)

        return res.status(200).json(removido)


    } else {
        return res.status(404).json(undefined)
    }
}