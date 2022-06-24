import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default (req, res) => {
    if (req.method === 'POST') {
        createCategory(req, res)
    };
    if (req.method === 'GET') {
        getCategory(req, res)
    };
    if (req.method === 'PUT') {
        ModifyCategory(req, res)
    };
    if (req.method === 'DELETE') {
        DeleteCategory(req, res)
    };
}

//El SubCategory debe tener un id de la categoria padre

const DeleteCategory = ({ body, query }, res) => {
    const { id } = body;
    const deleteDocument = async () => {
        try {
            const session = await MongoClient.connect(BASE_URL_MONGO);
            const db = session.db();
            const collection = db.collection("SubCategoryMaterial");
            await collection.deleteOne({ id: id });

            session.close();
            res.status(200).json({
                message: 'Eliminado correctamente.'
            })
        } catch (error) {
            res.status(500).json({
                message: `Error al eliminar el manual: ${err}`
            })
        }
    };
    deleteDocument();
};

const ModifyCategory = ({ body }, res) => {
    const editStepManual = async () => {
        try {
            const objectModified = {
                $set: {
                    ...body
                }
            };
            const filter = { id: body.step };
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("SubCategoryMaterial");
            await collection.updateOne(filter, objectModified);

            session.close();
            res.status(200).json({
                message: 'Se a actualizado correctamente.'
            });
        } catch (err) {
            res.status(500).json({
                message: `Error al actualizar el manual.`
            });
        }
    };
    editStepManual();
};

const getCategory = ({ query }, res) => {
    const fetchManualSteps = async () => {
        try {
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("SubCategoryMaterial");
            let fetchManul;
            if (query?.language !== 'all') {
                fetchManul = await collection.find({ language: query.language }).toArray();
            } else {
                fetchManul = await collection.find().toArray();
            }
            const listOrdered = fetchManul.sort((a, b) => a.order - b.order);

            session.close();
            res.status(200).json({
                steps: listOrdered
            });
        } catch (err) {
            console.error(`Error al obtener pasos del manual ${err}`);
            res.status(500).json({
                message: 'No se puede obtener el manual de la base de datos.'
            });
        }
    }
    fetchManualSteps();
};

const createCategory = ({ body }, res) => {
    const fetchInfoConfig = async () => {
        try {
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("SubCategoryMaterial");
            const idCategory = uuidv4();
            const createCategory = await collection.insertOne({
                id: idCategory,
                ...body
            });

            session.close();
            res.status(200).json({
                id: idCategory,
                configurationSite: createCategory
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




