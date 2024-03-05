import { atualizarEstatisticasUtilizadores } from "@/backend/data/estatisticasUtilizadores"
import moment from "moment"

export default async function handler(req, res) {

    if (req.method === "GET") {

        async function timer() {
            console.log("\nInicio atualizações")
            setInterval(async () => {
                console.log("\nA atualizar estatisticas utilizadores")
                await atualizarEstatisticasUtilizadores()
                console.log("Atualizado", moment().format("HH:mm.ss"))
                
                console.log("\nA atualizar estatisticas filmes e séries")
                await atualizarEstatisticasConteudo()                
                console.log("Atualizado", moment().format("HH:mm.ss"))
                

            }, 15000)

        }

        timer()

        return res.status(200).json(undefined)
    }
}