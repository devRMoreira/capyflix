const { MongoClient } = require('mongodb')

const DEFAULT_DB_NAME = "capyflix"
const URL = "mongodb+srv://ricardo:t5sa6sFaQn6NPCFa@cluster0.2nzoof0.mongodb.net/"

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

export async function updateDocument(filter, document, collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo()
    const database = await client.db(dbName)
    return await database.collection(collectionName).replaceOne(filter, document)

}

export async function findDocument(filter, collectionName) {
    const collection = await getMongoCollection(collectionName)
    return await collection?.findOne(filter)
}

