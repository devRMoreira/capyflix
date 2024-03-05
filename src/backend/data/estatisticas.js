import { getDuracaoGeneroFilme } from "./filme";
import { updateOneDocument } from "./mongodb";
import { getDuracaoGeneroSerie } from "./serie";
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

    const duracaoConteudo = conteudo.idFilme ? await getDuracaoGeneroFilme(conteudo.idFilme) : await getDuracaoGeneroSerie(conteudo.idSerie)

    console.log(duracaoConteudo)
    let novaEstatistica

    if (conteudo.idFilme) {
        novaEstatistica = {
            $set:
            {
                "estatisticas.filmes": incrementar(estatisticasUtilizador.estatisticas.filmes, duracaoConteudo.duracao, duracaoConteudo.genero)
            }
        }

    }

    if (conteudo.idSerie) {

        const episodios = getEpisodiosTotais(duracaoConteudo.temporadas)
        console.log(episodios)

        novaEstatistica = {
            $set:
            {
                "estatisticas.series": incrementar(estatisticasUtilizador.estatisticas.series, duracaoConteudo.duracao, duracaoConteudo.genero, episodios)

            }
        }

    }

    const atualizar = await updateOneDocument(filter, novaEstatistica, defaultCollection)

    return atualizar

}

function incrementar(utilizador, duracao, generos, episodios = 0) {

    if (episodios != 0) {

        const atualizarSeries = {
            quantidade: utilizador.quantidade + 1,
            tempo: utilizador.tempo + (duracao * episodios),
            generos: verificaGenerosAdicionar(utilizador, generos)
        }

        return atualizarSeries

    }

    const atualizarFilmes = {
        quantidade: utilizador.quantidade + 1,
        tempo: utilizador.tempo + duracao,
        generos: verificaGenerosAdicionar(utilizador, generos)
    }

    return atualizarFilmes

}

export async function decrementarEstatisticas(filter, conteudo) {

    const estatisticasUtilizador = await getEstatisticasUtilizador(filter)

    const duracaoConteudo = conteudo.idFilme ? await getDuracaoGeneroFilme(conteudo.idFilme) : await getDuracaoGeneroSerie(conteudo.idSerie)

    let novaEstatistica

    if (conteudo.idFilme) {
        novaEstatistica = {
            $set:
            {
                "estatisticas.filmes": decrementar(estatisticasUtilizador.estatisticas.filmes, duracaoConteudo.duracao, duracaoConteudo.genero)
            }
        }

    }

    if (conteudo.idSerie) {

        const episodios = getEpisodiosTotais(duracaoConteudo.temporadas)

        novaEstatistica = {
            $set:
            {
                "estatisticas.series": decrementar(estatisticasUtilizador.estatisticas.series, duracaoConteudo.duracao, duracaoConteudo.genero, episodios)

            }
        }

    }

    const atualizar = await updateOneDocument(filter, novaEstatistica, defaultCollection)

    return atualizar

}

function decrementar(utilizador, duracao, generos, episodios = 0) {

    if (episodios != 0) {

        const atualizarSeries = {
            quantidade: utilizador.quantidade - 1,
            tempo: utilizador.tempo - (duracao * episodios),
            generos: utilizador.generos
        }

        return atualizarSeries

    }

    const atualizarFilmes = {
        quantidade: utilizador.quantidade - 1,
        tempo: utilizador.tempo - duracao,
        generos: utilizador.generos
    }

    return atualizarFilmes

}

function verificaGenerosAdicionar(utilizador, generos) {


    for (let i = 0; i < generos.length; i++) {
        if (!utilizador.generos.includes(generos[i])) {
            utilizador.generos.push(generos[i])
        }
    }

    return utilizador.generos

}

function verificaGenerosRemover(utilizador, generos) {




    return

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

