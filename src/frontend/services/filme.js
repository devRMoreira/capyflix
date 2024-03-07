export async function fetchFilme(id) {
    const res = (await fetch(`http://localhost:3000/api/filme/${id}`))
    return await res.json()
}

export async function fetchFilmeAleatorio() {
    const res = (await fetch(`http://localhost:3000/api/filme/random`))
    return await res.json()
}