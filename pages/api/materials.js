import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
import { BASE_URL_MONGO } from "../../constants/config";


export default function Material(req, res) {
    if (req.method === 'GET') getMaterials(req, res);
    if (req.method === 'POST') createMaterial(req, res);
    if (req.method === 'PUT') ModifyMaterial(req, res);
    if (req.method === 'DELETE') deleteMaterial(req, res);
}

const deleteMaterial = async (req, res) => {
    try {
        const client = await MongoClient.connect(BASE_URL_MONGO);
        const db = client.db();
        const collection = db.collection('Materials');
        const filter = { idMaterial: req.query.idMaterial };

        const modify = await collection.deleteOne(filter);

        res.status(200).json({
            result: modify
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

const ModifyMaterial = async (req, res) => {
    try {
        const client = await MongoClient.connect(BASE_URL_MONGO);
        const db = client.db();
        const collection = db.collection('Materials');
        const filter = { idMaterial: req.query.idMaterial };
        const objectModify = {
            $set: {
                ...req.body
            }
        }

        const modify = await collection.updateOne(filter, objectModify);
        res.status(200).json({
            result: objectModify
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

const createMaterial = async (req, res) => {
    try {
        const client = await MongoClient.connect(BASE_URL_MONGO);
        const db = client.db();
        const collection = db.collection('Materials');

        const create = await collection.insertOne({
            ...req.body
        });

        client.close();
        res.status(200).json({
            result: create
        });
    } catch (error) {
        res.status(500).json({
            result: create
        });
    }
};

const getMaterials = async (req, res) => {
    try {
        const client = await MongoClient.connect(BASE_URL_MONGO)
        const db = client.db();
        const collection = db.collection('Materials');
        const materials = await collection.find().toArray();

        client.close();
        res.status(200).json({
            materials: materials
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};
