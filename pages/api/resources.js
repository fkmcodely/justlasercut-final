import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handler(req,res) {
    const { method } = req;
   
    if(method === 'GET') {
        getSiteResources(req,res);
    }
    if(method === 'POST') {
        createResource(req,res);  
    }
    if(method === 'PUT') {
        putDocResource(req,res);  
    }
    if(method === 'DELETE') {
        deleteResource(req,res);  
    }
}

const deleteResource = (req,res) => {
    const resourceDelete =  async () => {
        try {
            const session = await MongoClient.connect(BASE_URL_MONGO);
            const db = session.db();
            const collection = db.collection("resources");
            const filter = { idResource : req.query.idResource };
            await collection.deleteOne(filter);
            
            res.status(200).json({
                message: 'DeletedSuccesfully'
            })
        } catch (error) {
            
            res.status(500).json({
                message: 'DeleteFailed!'
            });
        }
    }
    resourceDelete();
};

const getSiteResources = async (req,res) => {
    try {
        const session = await MongoClient.connect(BASE_URL_MONGO);
        const db = session.db();
        const collection = db.collection("resources");
        const getCollection = await collection.find().toArray();

        res.status(200).json({
            message: 'GetSuccesfully!',
            resources: getCollection
        })
    } catch (err) {
        console.error(`Error al obtener los pasos. ${err}`);

    }
};

const putDocResource = (req,res) => {
    const putResource = async () => {
        try {
            const session = await MongoClient.connect(BASE_URL_MONGO);
            const db = session.db();
            const collection = db.collection('resources');
            const filter = { idResource : req.query.idResource };
            const resourceUpdated = {
                $set: {
                    ...req.body
                }
            }
            await collection.updateOne(filter,resourceUpdated);

            res.status(200).json({
                message: 'ModifiedSuccesfully!'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error
            });
        }
    };
    putResource();
}

const createResource = ({body},res) => {
    const fetchResource = async () => {
        try {
            const session = await MongoClient.connect(BASE_URL_MONGO);
            const db = session.db();
            const collection = db.collection("resources");
            await collection.insertOne({
                ...body,
                idResource: uuidv4()   
            });
            res.status(200).json({
                message: 'CreatedSuccesfully!'
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'CreatedFail!'
            });
        }
    };
    fetchResource();
};
