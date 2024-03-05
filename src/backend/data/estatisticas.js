import { getDuracaoFilme } from "./filme";
import { updateOneDocument } from "./mongodb";
import { getDuracaoSerie } from "./serie";
import { getEstatisticasUtilizador } from "./utilizador";

const defaultCollection = "utilizadores"


// const timer = setTimeout(() => {
//     someFunction()
// }, 1000);


// async function atualizarMediaAvaliacoes() {

// }

//async function atualizarVisualizacoes() {

//}

export async function incrementarEstatisticas(filter, conteudo) {

    const estatisticasUtilizador = await getEstatisticasUtilizador(filter)

    const duracaoConteudo = conteudo.idFilme ? await getDuracaoFilme(conteudo.idFilme) : await getDuracaoSerie(conteudo.idSerie)

    console.log(duracaoConteudo)
    let novaEstatistica

    if (conteudo.idFilme) {
        novaEstatistica = {
            $set:
            {
                "estatisticas.filmes": incrementarEstatistica(estatisticasUtilizador.estatisticas.filmes, duracaoConteudo.duracao, duracaoConteudo.genero)
            }
        }

    }

    if (conteudo.idSerie) {

        const episodios = getEpisodiosTotais(duracaoConteudo.temporadas)
        console.log(episodios)

        novaEstatistica = {
            $set:
            {
                "estatisticas.series": incrementarEstatistica(estatisticasUtilizador.estatisticas.series, duracaoConteudo.duracao, duracaoConteudo.genero, episodios)

            }
        }

    }

    const atualizar = await updateOneDocument(filter, novaEstatistica, defaultCollection)

    return atualizar

}

function incrementarEstatistica(utilizador, duracao, generos, episodios = 0) {

    if (episodios != 0) {

        const atualizarSeries = {
            quantidade: utilizador.quantidade + 1,
            tempo: utilizador.tempo + (duracao * episodios),
            generos: verificaGeneros(utilizador, generos)
        }

        return atualizarSeries

    }

    const atualizarFilmes = {
        quantidade: utilizador.quantidade + 1,
        tempo: utilizador.tempo + duracao,
        generos: verificaGeneros(utilizador, generos)
    }

    return atualizarFilmes

}

function verificaGeneros(utilizador, generos) {

    console.log(utilizador)


    for (let i = 0; i < generos.length; i++) {
        if (!utilizador.generos.includes(generos[i])) {
            utilizador.generos.push(generos[i])
        }
    }

    return utilizador.generos

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

