import { getMembroEquipa } from "@/backend/data/equipa"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const membro = await getMembroEquipa(id)

        if (membro.mensagem.includes("Sucesso")) {
            return res.status(200).json(membro)
        } else {
            return res.status(403).json(membro)
        }

    } else {
        return res.status(404).json(undefined)
    }
}