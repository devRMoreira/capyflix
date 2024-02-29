import { ObjectId } from "mongodb";
import { findOneDocument } from "./mongodb";

const defaultCollection = "series"

export async function findSerie(id) {
    const filter = { _id: new ObjectId(id) }
    const serie = await findOneDocument(filter, defaultCollection)

    if (serie === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    return {
        mensagem: "Sucesso.",
        serie
    }
}