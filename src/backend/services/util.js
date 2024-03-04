export function filtrarArray(array, id) {

    return array.filter((ele) => ele !== id)
}

export function filtrarArrayObjetos(array, id) {

    return array.filter((ele) => ele.id !== id)
}

export function encontrarIdArrayObjetos(array, id) {
    return array.find((ele) => ele.id === id)
}