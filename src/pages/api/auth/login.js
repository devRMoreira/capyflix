import { passwordEncryption } from "@/services/utilizador"
import { loginValidation } from "@/services/validacao"

export default async function handler(req, res) {

    if (req.method === "POST") {

        if (!req.body.password || !req.body.email) {
            return res.status(400).json({ status: 400 })
        }

        const user = {
            email: req.body.email,
            password: passwordEncryption(req.body.password)
        }

        const validation = await loginValidation(user)

        if (validation.message.includes("Sucesso")) {
            return res.status(201).json(validation)
        } else {
            return res.status(400).json(validation)
        }

    } else {
        return res.status(403)
    }
}