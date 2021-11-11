import moment from "moment";
import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handler(req,res) {
    const { method } = req;
   
    if(method === 'GET') {
        getAllReviews(req,res);
    }
    if(method === 'POST') {
        createReview(req,res)
    }
    if(method === 'DELETE') {
        deleteReview(req,res)
    }
}


function createReview({ body },res) {
    const create = async () => {
        try {
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("reviews");
            const fetchReview = await collection.insertOne({
                ...body,
                show: false
            });

            return res.status(200).json({
                message: 'Review creada correctamente',
                created: fetchReview
            });
        } catch (err) {
            console.error(`Error al crear review: ${err}`)
            return res.status(500).json({
                message: `Error al crear review: ${err}`
            });
        }
    };
    create();
};



function deleteReview({ body },res) {
    const deletes = async () => {
        try {
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("reviews");
            const fetchReview = await collection.deleteOne({
                "email": body.id
            });

            return res.status(200).json({
                message: 'Review borrada correctamente',
                created: fetchReview
            });
        } catch (err) {
            console.error(`Error al crear review: ${err}`)
            return res.status(500).json({
                message: `Error al crear review: ${err}`
            });
        }
    };
    deletes();
};

function getAllReviews({ body },res) {
    const { email } = body;
    const fetch = async () => {
        try {
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("reviews");
            const request = await collection.find().toArray();
            
            return res.status(200).json({
               ...request
            })
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    };
    fetch();
};

