const { MongoClient } = require('mongodb')

const DEFAULT_DB_NAME = "capyflix"
const URL = "URL_AQUI"

let client

async function connectToMongo() {
    try {
        if (!client) {
            client = new MongoClient(URL)
        }
    } catch (err) {
        console.log(err)
    }
    return client;
}

export async function getMongoCollection(collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo()
    const database = await client.db(dbName)
    return await database.collection(collectionName)
}

export async function insertDocument(document, collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo()
    const database = await client.db(dbName)
    return await database.collection(collectionName).insertOne(document)
}

export async function replaceDocument(filter, document, collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo()
    const database = await client.db(dbName)
    return await database.collection(collectionName).replaceOne(filter, document)
}

export async function updateOneDocument(filter, update, collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo()
    const database = await client.db(dbName)
    return await database.collection(collectionName).updateOne(filter, update)
}

export async function findOneDocument(filter, collectionName) {
    const collection = await getMongoCollection(collectionName)
    return await collection?.findOne(filter)
}

export async function findDocuments(filter, collectionName) {
    const collection = await getMongoCollection(collectionName)
    return await collection?.find(filter).toArray()
}
