export async function fetchDadosUtilizador(id) {

    console.log("id")
    console.log(id)
    const response = await fetch(
        `http://localhost:3000/api/utilizador/${id}`
    );
    if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
    }
    const jsonData = await response.json();

    return jsonData.utilizadorFiltrado
}
