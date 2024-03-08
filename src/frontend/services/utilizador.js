export async function fetchDadosUtilizador(id) {

    const response = await fetch(
        `http://localhost:3000/api/utilizador/${id}`
    );
    if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
    }
    const jsonData = await response.json();

    return jsonData.utilizadorFiltrado
}


export function podeVerPerfil(id, quemSegue, seguidores) {
    if (quemSegue.length === 0 || seguidores.length === 0) {
        return false
    }

    return quemSegue.includes(id) && seguidores.includes(id)
}

export async function togglePrivado(booleano, id) {

    if (booleano) {
        const res = await fetch(`http://localhost:3000/api/utilizador/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "priv": true
            }),
            headers: {
                'content-type': 'application/json'
            }
        })

        return res
    } else {

        const res = await fetch(`http://localhost:3000/api/utilizador/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "priv": false
            }),
            headers: {
                'content-type': 'application/json'
            }
        })

        return res

    }
}

export async function fetchPrivado(id) {

    const response = await fetch(`http://localhost:3000/api/utilizador/${id}privado`)

    return await response.json()
}

export async function fetchDadosUtilizadorPrivado(id) {

    const response = await fetch(
        `http://localhost:3000/api/utilizador/${id}`
    );
    if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
    }
    const jsonData = await response.json();

    return {
        nome: jsonData.utilizadorFiltrado.nome,
        imagemPerfil: jsonData.utilizadorFiltrado.imagemPerfil
    }
}

export async function gerirLista(booleano, idConteudo, idUtilizador, tipo, lista) {

    if (booleano) {
        const res = await adicionarLista(idConteudo, idUtilizador, tipo, lista)

        return res
    } else {
        const res = await removerLista(idConteudo, idUtilizador, tipo, lista)

        return res
    }
}


async function adicionarLista(idConteudo, idUtilizador, tipo, lista) {

    console.log("idConteudo, idUtilizador, tipo, lista")
    console.log(idConteudo, idUtilizador, tipo, lista)

    const res = await fetch(`http://localhost:3000/api/${tipo}/${idConteudo}`, {
        method: "PATCH",
        body: JSON.stringify({
            "lista": String(lista),
            "idUtilizador": idUtilizador
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    return res
}

async function removerLista(idConteudo, idUtilizador, tipo, lista) {

    console.log("idConteudo, idUtilizador, tipo, lista")
    console.log(idConteudo, idUtilizador, tipo, lista)

    const res = await fetch(`http://localhost:3000/api/${tipo}/${idConteudo}`, {
        method: "DELETE",
        body: JSON.stringify({
            "lista": String(lista),
            "idUtilizador": idUtilizador
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    return res
}