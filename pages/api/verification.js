import { MongoClient } from "mongodb";
const { v4: uuidv4 } = require('uuid');
import { BASE_URL_MONGO } from "../../constants/config";
const url = BASE_URL_MONGO;
import nodemailer from 'nodemailer';


export default function handler(req, res) {
    const { method } = req;

    if (method === 'POST') {
        verifyProject(req, res);
    }
    
		if (method === 'PUT') {
        completeProject(req, res);
    }
}

const mailCardOptions = (options) => {
	const { idDelivery , creationDate, calculoPrecios, session, paymentLink, emailsend } = options.item;
	console.log(emailsend);
	return ({ 
		from: 'justlasercutdev@gmail.com',
		to: emailsend || 'kevinriveradev@gmail.com',
		subject: 'Realiza tu pedido',
		text: 'kevin',
		html: `
		<div>
			<h1>Tu pedido.</h1>
			<h3>Estimado cliente</h3>
			<p>
				Gracias por usar el servicio de compras online de JustLaserCut.
				Aquí encontrarás la información de tu pedido para que puedas completar el
				proceso de pago.
			</p>
			<a href="">
				REALIZAR PAGO
			</a>
		</div>
		`
	})
}

const mailBizumOptions = (options) => {
	const { idDelivery , creationDate, calculoPrecios, session, paymentLink, emailsend } = options.item;
	return ({ 
		from: 'justlasercutdev@gmail.com',
		to: emailsend || 'kevinriveradev@gmail.com',
		subject: 'Realiza tu pedido',
		text: 'kevin',
		html: `
		<div>
			<h1>Tu pedido.</h1>
			<h3>Estimado cliente</h3>
			<p>
				Gracias por usar el servicio de compras online de JustLaserCut.
				Para completar el proceso de comprar realiza un bizum al (+34 665 30 69 19). 
			</p>
			<p>
				En el concepto debes validar los 5 primeros digitos del identificador del pedido y tu nombre.
				Una vez nuestro equipo haya validado el pago te enviaremos un email de confirmación de pedido.
			</p>
		</div>
		`
	})
}

const completeProject = async ({ body : { id } }, res) => {
  const session = await MongoClient.connect(url);
  const db = session.db();
  const collection = db.collection("pedidos");
  await collection.updateOne({ "idDelivery": id}, { $set: { "verified" : true } },{ upsert: true });
  session.close();
  res.status(200).json({
    message: 'Se a actualizado correctamente.'
  });
}

const verifyProject = ({ body }, res) => {
	const { paymentSelected } = body.item;
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: { 
			user: 'justlasercutdev@gmail.com', 
			pass: '23324123Ff*'
		}
	});
    const fetchResource = async () => {
        try {
						transporter.sendMail(paymentSelected === 0 ? mailCardOptions(body) : mailBizumOptions(body), (x,y) => {
							res.status(200).json({
                message: `Email sent: `, 
            	});
						})
        } catch (err) {
					console.log(err)
            res.status(500).json({
                message: 'CreatedFail!'
            });
        }
    };
    fetchResource();
};



