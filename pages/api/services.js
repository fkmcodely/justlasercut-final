import moment from "moment";
import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handlerServices(req,res) {
    const { method } = req;
   
    if(method === 'GET') {
        getStepsServices(req,res);
    }
    if(method === 'POST') {
        createStepService(req,res);  
    }
    if(method === 'PUT') {
        editStepService(req,res);  
    }
}

const editStepService = ({ body },res) => {
    const editService = async () => {
        try {
            const {
                title,
                image,
                video,
                order,
                description, 
                buttons, 
                language,
                step
            } = body;
            const objectModified = {
                $set: {
                    title: title,
                    image: image,
                    video: video,
                    order: order,
                    description: description,
                    buttons: buttons,
                    language: language
                }
            };
            const filter = { id : step};
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ServicesSteps");
            await collection.updateOne(filter,objectModified);
            res.status(200).json({
                message: 'Se a actualizado correctamente.'
            })
        } catch (err) {
            console.error(`Error al actualizar paso del manual: ${err}`)
            res.status(500).json({
                message: `Error al actualizar el manual.`
            })
        } 
    };
    editService();
};

const getStepsServices = ({body},res) => {
    const fetchManualSteps = async () => {
        try {
            const { language } = body;
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ServicesSteps");
            const fetchManul = await collection.find().toArray();
            
            res.status(200).json({
                services: fetchManul
            });
        } catch(err) {
            res.status(500).json({
                message: 'No se puede obtener los servicios de la base de datos.'
            });
        }
    }
    fetchManualSteps();
};

const createStepService = ({ body },res) => {
    const fetchInfoConfig = async () => {
        try {
            const { title = '', image = '', video = '', order = '', description = '', buttons = {}, language = 'es' } = body;
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("ServicesSteps");
            const serviceId = uuidv4();
            const createServiceStep = await collection.insertOne({
                id: serviceId,
                title,
                image: serviceId,
                video,
                order,
                description, 
                buttons, 
                language
            });
            res.status(200).json({
                id: serviceId
            });
        } catch (err) {
            console.error(`Error al crear un paso del manual ${err}`);
            res.status(500).json({
                error: `No se pudo obtener la configuración del sitio.`
            });
        }
    };
    fetchInfoConfig();
};





