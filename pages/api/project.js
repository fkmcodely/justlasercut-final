import fs from "fs";
const child = require('child_process').execFile;

export default (req, res) => {
    if (req.method === 'POST') {
        handlerUploadFile(req, res);
    }
}

const handlerUploadFile = ({ body }, res) => {
    const { fileName } = body;
    try {
        fs.writeFile('./LaserCutApp/file.txt', fileName, (err) => {
            if (err) throw err;
            let executablePath = "C:/Users/kevin.rivera/personal/justlasercut-final/LaserCutApp/bin/Debug/LaserCutApp.exe";

            child(executablePath, function (err, data) {
                const messagesExceptions = ["Insert\r", "\r", "Point\r"];
                const canPass = ["BOARD", "TYPE", "PLANCHA", "PLANCHA"];
                const filterMessages = data.split('\n').filter((str) => !messagesExceptions.includes(str))
                console.log(filterMessages)
                const filter = filterMessages.filter((str) => str.includes('BOARD') || str.includes('TYPE') || str.includes('PLANCHA'))

                let planchas = []
                let object = {
                    board: '',
                    capas: []
                }
                filter.map((message, index) => {
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

                    }
                    if (message.includes('PLANCHA')) {
                        planchas.push(object)
                        object = {
                            board: '',
                            capas: []
                        }
                    }
                });
                let response = {
                    planchas: planchas
                };
                res.status(200).json(response)
            });

        })
    } catch (err) {
        console.error(`Error al escribir fichero`);
        res.status(500).json({
            message: 'Error al escribir el fichero'
        })
    }

};