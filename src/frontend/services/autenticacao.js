export async function registarUtilizador(nome, email, password) {

    const registo = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            nome: nome, email: email, password: password
        }),
        headers: {
            'content-type': 'application/json'
        }
    })


    return registo.ok
}

export async function loginUtilizador(email, password) {
    console.log(email, password)
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email: email, password: password
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    const dados = await res.json()

    return dados.id
}