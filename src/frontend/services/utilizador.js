export async function registarUtilizador(nome, email, senha) {

    const registo = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            nome: nome, email: email, password: senha
        }),
        headers: {
            'content-type': 'application/json'
        }
    })


    if (registo.ok) {
        return true
    } else {
        return false
    }
}