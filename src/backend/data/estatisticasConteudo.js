import { atualizarAvaliacaoMediaSerie, getComentariosTodasSeries } from "./serie";
import { atualizarAvaliacaoMediaFilme, getComentariosTodosFilmes } from "./filme";
import moment from "moment";
import { getTodasAvaliacoes } from "./comentario";




//* se passado um ID a função atualiza as estatisticas do utilizador

export async function atualizarEstatisticasConteudo() {

    let filter = {}
    const projection = {
        _id: 1,
        comentarios: 1
    }

    const filmes = await getComentariosTodosFilmes(filter, projection)

    await atualizarAvaliacaoFilmes(filmes)

    console.log("Filmes atualizados", moment().format("HH:mm.ss"))


    const series = await getComentariosTodasSeries(filter, projection)

    await atualizarAvaliacaoSeries(series)

    console.log("Series atualizadas", moment().format("HH:mm.ss"))

    return
}

async function atualizarAvaliacaoFilmes(arrayFilmes) {

    for (let i = 0; i < arrayFilmes.length; i++) {

        if (arrayFilmes[i].comentarios.length === 0) {
            continue
        }
        const idFilme = arrayFilmes[i]._id
        const avaliacoes = await getTodasAvaliacoes(arrayFilmes[i].comentarios)
        const media = calcularMediaAvaliacoes(avaliacoes)

        await atualizarAvaliacaoMediaFilme(idFilme, media)

    }

    return
}

async function atualizarAvaliacaoSeries(arraySeries) {

    for (let i = 0; i < arraySeries.length; i++) {

        if (arraySeries[i].comentarios.length === 0) {
            continue
        }

        const idSerie = arraySeries[i]._id
        const avaliacoes = await getTodasAvaliacoes(arraySeries[i].comentarios)
        const media = calcularMediaAvaliacoes(avaliacoes)

        await atualizarAvaliacaoMediaSerie(idSerie, media)

    }

    return
}

function calcularMediaAvaliacoes(array) {

    let soma = 0

    for (let i = 0; i < array.length; i++) {
        soma += array[i].avaliacao
    }

    return Math.round(soma / array.length)
}
