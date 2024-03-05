import { addUserToCollection, findEmailInCollection } from "@/backend/data/utilizador"

export async function signupValidation(user) {

    if (await findEmailInCollection(user.email)) {
        return {
            mensagem: "O email já se encontra registado.",
        }
    }

    const addedUser = await addUserToCollection(user)

    return {
        mensagem: "Utilizador criado com sucesso!",
        id: addedUser.insertedId
    }
}

export async function loginValidation(user) {

    const registeredUser = await findEmailInCollection(user.email)

    if (!registeredUser || !passwordValidation(user, registeredUser)) {
        return {
            mensagem: "Dados inválidos.",
        }
    }

    return {
        mensagem: "Sucesso."
    }
}

export function passwordValidation(user, registeredUser) {

    return user.password === registeredUser.password
}

