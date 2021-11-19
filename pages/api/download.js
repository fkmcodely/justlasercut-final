import * as path from 'path'

export default (req, res) => {
    if (req.method === 'GET') {
        const file = `${__dirname}/public/${req.query.filename}`;
        try {
            res.status(200).download(file);
        } catch (err) {
            res.status(500).json({
                message: 'Error al descargar fichero'
            })
        }
    };
};