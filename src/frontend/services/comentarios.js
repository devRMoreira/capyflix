export async function fetchComentariosUtilizador(id) {

    const historico = await fetch(`http://localhost:3000/api/utilizador/${id}comentarios`)
    const arrayIds = await historico.json()
    let arrayComentarios = []

    if (arrayIds.historicoComentarios.length > 0) {

        for (let i = 0; i < arrayIds.historicoComentarios.length; i++) {
            arrayComentarios.push(await fetchComentario(arrayIds.historicoComentarios[i]))
        }

    }

    return arrayComentarios
}

export async function fetchComentario(id) {

    const comentario = await fetch(`http://localhost:3000/api/comentario/${id}`)
    return await comentario.json()
}