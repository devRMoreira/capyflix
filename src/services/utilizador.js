const { fromString } = require("uuidv4")

export function passwordEncryption(password) {
    return fromString(password)
}


