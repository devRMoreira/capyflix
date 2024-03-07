export async function getPesquisa(termoPesquisa) {
    const res = await fetch(`http://localhost:3000/api/pesquisa/${termoPesquisa}`)
    return await res.json()
}

export async function getUltimosCinco() {
    const res = (await fetch("http://localhost:3000/api/pesquisa/ultimosCinco"))
    return await res.json()
}