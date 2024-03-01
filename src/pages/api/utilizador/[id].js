import { adicionarSeguidor, findUserInCollection } from "@/backend/data/utilizador"

export default async function handler(req, res) {

    if (req.method === "GET") {


        const id = req.query.id

        if (id.length !== 24) {
            return res.status(403).json({
                mensagem: "ID inválido."
            })
        }

        const utilizador = await findUserInCollection(id)

        if (utilizador.mensagem.includes("Sucesso")) {
            return res.status(200).json(utilizador)
        } else {
            return res.status(403).json(utilizador)
        }

    } else if (req.method === "PATCH") {

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



    } else {
        return res.status(404).json(undefined)
    }
}