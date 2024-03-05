import { atualizarEstatisticas } from "@/backend/data/estatisticas"

export default async function handler(req, res) {

    if (req.method === "GET") {

        async function timer() {
            console.log("começar atualização")
            setInterval(async () => {
                console.log("A atualizar estatisticas utilizadores")
                atualizarEstatisticas()
                console.log("atualizado", moment())
            }, 5000)

        }

        timer()

        return res.status(200).json(undefined)
    }
}