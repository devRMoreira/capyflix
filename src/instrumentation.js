const { atualizarEstatisticas } = require("./backend/data/estatisticas");

export async function register() {
    const timer = setTimeout(async () => {
        await atualizarEstatisticas()
        console.log("atualizado", new Date().getMinutes())
    }, 30000)

}