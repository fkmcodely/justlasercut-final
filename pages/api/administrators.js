import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;

export default (req, res) => {
    if (req.method === 'POST') {
        validateAdministrator(req, res)
    };
}

const validateAdministrator = ({ body }, res) => {
		const { email , password } = body;
    
		const fetchManualSteps = async () => {
        try {
            const session = await MongoClient.connect(url);
            const db = session.db();
            const collection = db.collection("Admin");
            const fetchAdmins = await collection.findOne({ email: email })

						let isAdmin = fetchAdmins.password === password; 

            session.close();
            res.status(200).json({
                token: isAdmin ? fetchAdmins.token : null
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





