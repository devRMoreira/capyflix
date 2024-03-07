export async function getSerie(id) {
    const res = (await fetch(`http://localhost:3000/api/serie/${id}`))
    return await res.json()
}

export async function getSerieAleatoria() {
    const res = (await fetch(`http://localhost:3000/api/serie/random`))
    return await res.json()
}