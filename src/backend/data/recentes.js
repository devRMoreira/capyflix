import { getMongoCollection } from "./mongodb"

const colecaoFilmes = "filmes"
const colecaoSeries = "series"

export async function ultimosCinco() {

    const collectionFilmes = await getMongoCollection(colecaoFilmes)
    const filmesEncontrados = await collectionFilmes?.find().toArray()


    const collectionSeries = await getMongoCollection(colecaoSeries)
    const seriesEncontradas = await collectionSeries?.find().toArray()

    return filmesEncontrados.concat(seriesEncontradas).toSorted((a, b) => b.dataLancamento - a.dataLancamento).slice(0, 5)

}