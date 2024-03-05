import { adicionarNovoComentario, getComentario, getTodosComentarios } from "@/backend/data/comentario"

export default async function handler(req, res) {

    if (req.method === "GET") {

        if (req.query.id === "todos") {

            const conteudo = {
                tipo: req.body.tipo,
                id: req.body.id
            }

            const comentarios = await getTodosComentarios(conteudo)

            return res.status(200).json(comentarios)

        }

        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const comentario = await getComentario(id)

        if (comentario.mensagem.includes("Sucesso")) {
            return res.status(200).json(comentario)
        } else {
            return res.status(403).json(comentario)
        }

    } else if (req.method === "POST" && req.query.id === "novo") {


        if (!req.body.comentario && !req.body.avaliacao) {
            return res.status(403).json({
                mensagem: "Comentário inválido."
            })
        }


        const comentario = {
            comentario: req.body.comentario,
            avaliacao: req.body.avaliacao,
            utilizador: req.body.utilizador,
            tipo: req.body.tipo,
            idConteudo: req.body.id
        }


        const novoComentario = await adicionarNovoComentario(comentario)

        if (novoComentario.mensagem.includes("sucesso")) {
            return res.status(201).json(novoComentario)
        } else {
            return res.status(400).json(novoComentario)
        }


    } else {
        return res.status(404).json(undefined)

    }
}