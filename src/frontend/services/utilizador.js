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
