import { adicionarLista, removerLista } from "@/backend/data/listas"
import { getListaComentariosFilmeInfo, getFilme, getFilmeAleatorio } from "@/backend/data/filme"
import { getComentario } from "@/backend/data/comentario"

export default async function handler(req, res) {

    if (req.method === "GET") {

        if (req.query.id === "random") {

            const filme = await getFilmeAleatorio()

            return res.status(200).json(filme)
        }

        const id = req.query.id.slice(0, 24)

        if (req.query.id.includes("comentarios")) {

            const lista = await getListaComentariosFilmeInfo(id)
            return res.status(200).json(lista)
        }


        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const filme = await getFilme(id)

        if (filme.mensagem.includes("Sucesso")) {
            return res.status(200).json(filme.filme)
        } else {
            return res.status(403).json(filme)
        }

    } else if (req.method === "PATCH") {

        if (req.query.id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const lista = req.body.lista

        const conteudo = {
            idFilme: req.query.id,
            idUtilizador: req.body.idUtilizador
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
            idFilme: req.query.id,
            idUtilizador: req.body.idUtilizador
        }

        const removido = await removerLista(conteudo, lista)

        return res.status(200).json(removido)


    } else {
        return res.status(404).json(undefined)
    }
}