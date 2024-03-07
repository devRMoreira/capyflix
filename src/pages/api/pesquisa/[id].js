import { procurarConteudo } from "@/backend/data/pesquisa"
import { ultimosCinco } from "@/backend/data/recentes"

export default async function handler(req, res) {

    if (req.method === "GET") {

        const pesquisa = req.query.id

        if(pesquisa === "ultimosCinco"){
            const resultado = await ultimosCinco()
            return res.status(200).json(resultado)
        }

        const resultado = await procurarConteudo(pesquisa)
        return res.status(200).json(resultado)
    } else {

        return res.status(404).json(undefined)

    }
}
