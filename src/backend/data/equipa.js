import { ObjectId } from "mongodb";
import { findOneDocument } from "./mongodb";

const defaultCollection = "equipa"

export async function getMembroEquipa(id) {
    const filter = { _id: new ObjectId(id) }
    const membro = await findOneDocument(filter, defaultCollection)

    if (membro === null) {
        return {
            mensagem: "ID inválido.",
        }
    }

    return {
        mensagem: "Sucesso.",
        membro
    }
}