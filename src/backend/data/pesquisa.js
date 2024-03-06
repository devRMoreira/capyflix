import { getMongoCollection } from "./mongodb"

const colecaoFilmes = "filmes"
const colecaoSeries = "series"

export async function procurarConteudo(pesquisa) {

    const regex = new RegExp(pesquisa, "i")

    const filter = {
        $or: [
            { "titulo": { $regex: regex } },
            { "tituloOriginal": { $regex: regex } }
        ]
    }

    let projection = { titulo: 1, tipo: "filme" }


    const collectionFilmes = await getMongoCollection(colecaoFilmes)
    const filmesEncontrados = await collectionFilmes?.find(filter, { projection }).toArray()

    projection = { titulo: 1, tipo: "serie" }


    const collectionSeries = await getMongoCollection(colecaoSeries)
    const seriesEncontradas = await collectionSeries?.find(filter, { projection }).toArray()

    return filmesEncontrados.concat(seriesEncontradas).toSorted((a, b) => a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase()))

}