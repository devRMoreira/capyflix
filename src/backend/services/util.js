export function filtrarArray(array, id){

    return array.filter((ele) => ele !== id)
}

export function filtrarArrayObjetos(array, id){

    return array.filter((ele) => ele.id !== id)
}