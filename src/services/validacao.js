import { addUserToCollection, findUserInCollection } from "@/data/utilizador"


export async function signupValidation(user) {

    const email = user.email

    if (await findUserInCollection({ email })) {
        return {
            message: "O email já se encontra registado.",
        }
    }


    const addedUser = await addUserToCollection(user)

    return {
        message: "Utilizador criado com sucesso!",
        _id: addedUser.insertedId
    }

}

export async function loginValidation(user) {

    const email = user.email

    const registeredUser = await findUserInCollection({ email })

    if (!registeredUser || !passwordValidation(user, registeredUser)) {
        return {
            message: "Dados inválidos.",
        }
    }

    return {
        message: "Sucesso."
    }
}

export function passwordValidation(user, registeredUser) {

    return user.password === registeredUser.password
}

