export async function getPesquisa(termoPesquisa) {
    const res = (await fetch(`http://localhost:3000/api/pesquisa/${termoPesquisa}`))
    return await res.json()
}