import { getMongoCollection } from "./mongodb"

const colecaoFilmes = "filmes"
const colecaoSeries = "series"

export async function ultimosCinco() {

    let projection = {
        titulo: 1,
        generos: 1,
        duracao: 1,
        classificaoEtaria: 1,
        mediaAvaliacoes: 1,
        capa: 1,
        dataLancamento: 1,
        tipo: "filme"
    }

    const collectionFilmes = await getMongoCollection(colecaoFilmes)
    const filmesEncontrados = await collectionFilmes?.find({}, { projection }).toArray()

    projection = { ...projection, tipo: "serie" }

    const collectionSeries = await getMongoCollection(colecaoSeries)
    const seriesEncontradas = await collectionSeries?.find({}, { projection }).toArray()

    return filmesEncontrados.concat(seriesEncontradas).toSorted((a, b) => b.dataLancamento - a.dataLancamento).slice(0, 5)

}