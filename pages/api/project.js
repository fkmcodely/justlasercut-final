import fs from "fs";
import { MongoClient } from "mongodb";
import { BASE_URL_MONGO } from "../../constants/config";
const { v4: uuidv4 } = require('uuid');
const child = require('child_process').execFile;
const dxf = require('dxf');
export default (req, res) => {
    if (req.method === 'POST') {
        handlerUploadFile(req, res);
    }
}

const handlerUploadFile = async ({ body }, res) => {
    const { fileName, originalName } = body;
    try {
        fs.writeFile('./LaserCutApp/file.txt', fileName, (err) => {
            if (err) throw err;
            let executablePath = "C:/desarrollo/justlasercut-final/LaserCutApp/bin/Debug/LaserCutApp.exe";

            child(executablePath, async function (err, data) {
                console.log('----------------data');
                console.log('----------------data');
                console.log(data);
                const messagesExceptions = ["Insert\r", "\r", "Point\r"];
                const canPass = ["BOARD", "TYPE", "PLANCHA", "PLANCHA"];
                const filterMessages = data.split('\n').filter((str) => !messagesExceptions.includes(str))
                const filter = filterMessages.filter((str) => str.includes('BOARD') || str.includes('TYPE') || str.includes('PLANCHA'))

                let planchas = []
                let object = {
                    board: '',
                    capas: [],
                    errorList: []
                }
                filter.map((message, index) => {
                    if(message.includes('ERR')) {
                        object.errorList.push(message);
                    }
                    if (message.includes('BOARD')) {
                        const messageConvertToArray = message.split('-');
                        object.board = {
                            width: parseFloat(messageConvertToArray[1]),
                            height: parseFloat(messageConvertToArray[2]),
                            numberBoards: parseFloat(messageConvertToArray[3]),
                        };
                    }
                    if (message.includes('TYPE')) {
                        if (message.includes('Corte exterior')) {
                            const messageConvertToArray = message.split('-');
                            const layer = {
                                type: messageConvertToArray[1],
                                longitud: messageConvertToArray[2],
                                nodes: messageConvertToArray[3]
                            };
                            object.capas.push(layer);
                        };
                        if (message.includes('Corte interior')) {
                            const messageConvertToArray = message.split('-');
                            const layer = {
                                type: messageConvertToArray[1],
                                longitud: messageConvertToArray[2],
                                nodes: messageConvertToArray[3]
                            };
                            object.capas.push(layer);
                        };
                        if (message.includes('Grabado linea bajo')) {
                            const messageConvertToArray = message.split('-');
                            const layer = {
                                type: messageConvertToArray[1],
                                longitud: messageConvertToArray[2],
                                nodes: messageConvertToArray[3]
                            };
                            object.capas.push(layer);
                        };
                        if (message.includes('Grabado linea medio')) {
                            const messageConvertToArray = message.split('-');
                            const layer = {
                                type: messageConvertToArray[1],
                                longitud: messageConvertToArray[2],
                                nodes: messageConvertToArray[3]
                            };
                            object.capas.push(layer);
                        };
                        if (message.includes('grabado linea alto')) {
                            const messageConvertToArray = message.split('-');
                            const layer = {
                                type: messageConvertToArray[1],
                                longitud: messageConvertToArray[2],
                                nodes: messageConvertToArray[3]
                            };
                            object.capas.push(layer);
                        };
                        if (message.includes('Grabado relleno')) {
                            const messageConvertToArray = message.split('-');
                            const layer = {
                                type: messageConvertToArray[1],
                                longitud: messageConvertToArray[2],
                                nodes: messageConvertToArray[3]
                            };
                            object.capas.push(layer);
                        };

                    }
                    if (message.includes('PLANCHA')) {
                        planchas.push(object)
                        object = {
                            planchaProperties: '',
                            capas: []
                        }
                    }
                });
                let projectItem561 = {
                    planchas: planchas
                };
                try {
                    const session = await MongoClient.connect(BASE_URL_MONGO);
                    const db = session.db();
                    const collection = db.collection("ProjectItem");
                    const idItem = uuidv4();
                    const ProjectItem = await collection.insertOne({
                        fileName: fileName,
                        id: idItem,
                        planchas: planchas
                    });

                    session.close();
                    const path = `C:/desarrollo/justlasercut-final/LaserCutApp/test/${fileName}`
                    const parsed = dxf.parseString(fs.readFileSync(path, 'utf-8'))
                    const svg = dxf.toSVG(parsed);
                    fs.writeFile(`C:/desarrollo/justlasercut-final/public/${fileName.replace('.dxf','.svg')}`,svg,'utf-8');
                    res.status(200).json({
                        fileName: fileName,
                        id: idItem,
                        planchas: planchas,
                        previsualization: `${fileName.replace('.dxf','.svg')}`,
                        originalName: originalName
                    });
                } catch (error) {
                    console.log('Error en sesion', error)
                }

            });

        })
    } catch (err) {
        console.error(`Error al escribir fichero`);
        res.status(500).json({
            message: 'Error al escribir el fichero'
        })
    }

};