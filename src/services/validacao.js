import { addUserToCollection, findEmailInCollection} from "@/data/utilizador"


export async function signupValidation(user) {

    const email = user.email

    if (await findEmailInCollection({ email })) {
        return {
            mensagem: "O email já se encontra registado.",
        }
    }


    const addedUser = await addUserToCollection(user)

    return {
        mensagem: "Utilizador criado com sucesso!",
        _id: addedUser.insertedId
    }

}

export async function loginValidation(user) {

    const email = user.email

    const registeredUser = await findEmailInCollection({ email })

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

