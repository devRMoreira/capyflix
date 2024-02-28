import { findFilme } from "@/data/filme"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const filme = await findFilme(id)

        if (filme.mensagem.includes("sucesso")) {
            return res.status(200).json(filme)
        } else {
            return res.status(403).json(filme)
        }



    } else {
        return res.status(403)
    }
}