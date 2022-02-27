import { MongoClient } from "mongodb";
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default function handler(req, res) {
    const { method } = req;
 
    if (method === 'POST') {
        createDelivery(req, res)
    }
}

function createDelivery({ body }, res) {
    const create = async () => {
        try {
            const client = await MongoClient.connect(url);
            const db = client.db();
            const collection = db.collection("pedidos");
            const deliveryCreated = await collection.insertOne({
                ...body,
            });

            client.close();
            return res.status(200).json({
                message: 'Pedido creado correctamente',
                created: deliveryCreated
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

