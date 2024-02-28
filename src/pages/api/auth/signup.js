import { passwordEncryption } from "@/services/utilizador"
import { signupValidation } from "@/services/validacao"

export default async function handler(req, res) {


    if (req.method === "POST") {

        if ((!req.body.nome || !req.body.password) || !req.body.email) {
            return res.status(418).json({ status: 418 })
        }

        const user = {
            nome: req.body.nome,
            email: req.body.email,
            password: passwordEncryption(req.body.password)
        }

        const validation = await signupValidation(user)

        if (validation.message.includes("sucesso")) {
            return res.status(201).json(validation)
        } else {
            return res.status(400).json(validation)
        }

    } else {
        return res.status(403)
    }
}

