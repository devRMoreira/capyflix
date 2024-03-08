export async function fetchSerie(id) {
    const res = (await fetch(`http://localhost:3000/api/serie/${id}`))
    return await res.json()
}

export async function fetchSerieAleatoria() {
    const res = (await fetch(`http://localhost:3000/api/serie/random`))
    return await res.json()
}

export async function fetchComentariosSerie(id) {
    const res = (await fetch(`http://localhost:3000/api/serie/${id}comentarios`))
  
    return await res.json()
}