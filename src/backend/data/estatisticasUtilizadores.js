import { ObjectId } from "mongodb";
import { getDuracaoGenerosFilme } from "./filme";
import { updateOneDocument } from "./mongodb";
import { getDuracaoGenerosSerie } from "./serie";
import { getListaVistoUtilizador, getTodosUtilizadores } from "./utilizador";

const defaultCollection = "utilizadores"

//* se passado um ID a função atualiza as estatisticas do utilizador

export async function atualizarEstatisticasUtilizadores(utilizador = null) {

    let filter = {}
    const projection = {
        _id: 1,
        conteudoVisto: 1
    }

    if (!utilizador) {

        utilizador = await getTodosUtilizadores(filter, projection)

    } else {

        filter = { _id: new ObjectId(utilizador) }

        const conteudoVisto = await getListaVistoUtilizador(filter)

        utilizador = [{
            _id: new ObjectId(utilizador),
            conteudoVisto: conteudoVisto.conteudoVisto
        }]
    }

    for (let i = 0; i < utilizador.length; i++) {

        let estatisticas = {
            filmes:
            {
                quantidade: 0,
                tempo: 0,
                generos: []
            },
            series: {
                quantidade: 0,
                tempo: 0,
                generos: []
            }
        }

        for (let j = 0; j < utilizador[i].conteudoVisto.length; j++) {

            if (utilizador[i].conteudoVisto[j].tipo === "filme") {
                const duracaoGenero = await getDuracaoGenerosFilme(utilizador[i].conteudoVisto[j].id)

                estatisticas.filmes.quantidade += 1
                estatisticas.filmes.tempo += duracaoGenero.duracao
                estatisticas.filmes.generos = verificaGeneros(estatisticas.filmes.generos, duracaoGenero.generos)
            }

            if (utilizador[i].conteudoVisto[j].tipo === "serie") {
                const duracaoGenero = await getDuracaoGenerosSerie(utilizador[i].conteudoVisto[j].id)

                estatisticas.series.quantidade += 1
                estatisticas.series.tempo += getEpisodiosTotais(duracaoGenero.temporadas) * duracaoGenero.duracao
                estatisticas.series.generos = verificaGeneros(estatisticas.series.generos, duracaoGenero.generos)
            }
        }

        let novaEstatistica = {
            $set: {
                estatisticas: estatisticas
            }
        }

        filter = { _id: new ObjectId(utilizador[i]._id) }

        await updateOneDocument(filter, novaEstatistica, defaultCollection)
    }
}

function verificaGeneros(generosUtilizador, generos) {

    for (let i = 0; i < generos.length; i++) {

        if (!generosUtilizador.includes(generos[i])) {
            generosUtilizador.push(generos[i])
        }
    }

    return generosUtilizador
}

function getEpisodiosTotais(temporadas) {

    let nEpisodios = 0

    for (let i = 0; i < temporadas.length; i++) {

        for (let j = 0; j < temporadas[i].length; j++) {
            nEpisodios++
        }
    }

    return nEpisodios
}