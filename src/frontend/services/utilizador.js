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


export function podeVerPerfil(id, quemSegue, seguidores){
    if(quemSegue.length == 0 || seguidores.length == 0 )
    return false
    return quemSegue.filter(id) && seguidores.filter(id)
}