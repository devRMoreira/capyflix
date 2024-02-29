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



    } else {
        return res.status(403)
    }
}