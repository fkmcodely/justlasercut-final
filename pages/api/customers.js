import moment from "moment";
import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handler(req,res) {
    const { method } = req;
   
    if(method === 'GET') {
        getUser(req,res);
    }
    if(method === 'POST') {
        registerUser(req,res)
    }
}


function getUser({ body },res) {
    const { email } = body;
    const fetch = async () => {
        try {
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("customers");
            const request = await collection.findOne({ email });
            
            return res.status(200).json({
               request
            })
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    };
    fetch();
};


function registerUser({ body },res) {
    const fetch = async () => {
        const { email , password, name, avatar = false } = body;
        const templateUser = {
            id: uuidv4(),
            email:email,
            password: bcrypt.hashSync(password,10),
            name: name,
            avatar: avatar,
            createdAt: moment().format('DD-MM-YYYY')
        }
        try {
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("customers");
            const response = await collection.insertOne(templateUser);
            client.close();
            return res.status(200).json({
               
            })
        } catch(err) {
            res.status(500)
        }
    }
    fetch();
}