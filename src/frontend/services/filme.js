export async function getFilme(id) {
    const res = (await fetch(`http://localhost:3000/api/filme/${id}`))
    return await res.json()
}