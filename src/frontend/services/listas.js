export async function fetchListaPorVer(id) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/utilizador/${id}porVer`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
        }
        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
};


export async function fetchListaVisto(id) {

    try {
        const response = await fetch(
            `http://localhost:3000/api/utilizador/${id}visto`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
        }
        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }

}


export async function fetchListaFavoritos(id) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/utilizador/${id}favorito`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
        }
        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}