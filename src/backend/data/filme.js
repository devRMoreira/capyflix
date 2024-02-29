import { ObjectId } from "mongodb";
import { findOneDocument } from "./mongodb";

const defaultCollection = "filmes"

export async function findFilme(id) {
    const filter = { _id: new ObjectId(id) }
    const filme = await findOneDocument(filter, defaultCollection)

    if (filme === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    return {
        mensagem: "Sucesso.",
        filme
    }
}