import axios from 'axios'
import React , { useEffect, useState } from 'react'
import { Button, Container, Divider, Grid, Header, Image } from 'semantic-ui-react'

export default function StepFour() {
     
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [prices,setPrices] = useState(JSON.parse(localStorage.getItem('calculate_prices')))
    const [delivery,setDelivery] = useState(JSON.parse(localStorage.getItem('delivery_x')))
    const [deliveryInfo,setDeliveryInfo] = useState(JSON.parse(localStorage.getItem('delivery_info')))

    const [materials,setMaterials] = useState([]);

    useEffect(() => {
        const get = async () => {
            const { data : { result }} = await axios.get(`/api/materials`);
            setMaterials(result);
        }
        get();
    },[])
console.log(prices,delivery.delivery.delivery.price.total_price)

const getTotalPedido = () => {
    return parseInt(delivery.delivery.delivery.price.total_price) 
        + parseInt(prices.subtotal) 
}
  return (
    <Container>
        <Grid columns={16}>
            <Grid.Row className='stepfour'>
                <Grid.Column computer={10} textAlign='center'>
                    <Header as="h1">¡Gracias por tu orden!</Header>
                </Grid.Column>
                <Grid.Column computer={12} textAlign="center" className='advise'>
                    <Header as="h4">Confirmación de compra</Header>
                    <p>
                        Tu orden se ha realizado con exito, nuestro equipo revisara la orden. Con 
                        el fin de rectificar que todos los ficheros cumplen con los estandares.
                        <b>Te enviaremos un correo electronico para completar el pago o en caso de
                            conflictos en tus ficheros.
                        </b>
                    </p>
                </Grid.Column>
                <Divider />
                <Grid.Column computer={12}>
                    <Header className='mb-5'>Resumen del pedido</Header>
                    {
                        cart.items.map((item) => (
                            <ItemDelivery materials={materials} item={item}/>
                        ))
                    }
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row >
                <Grid.Column computer={2}>
                    
                </Grid.Column>
                <Grid.Column computer={6} className="combobox">
                    <Header >Total pedido</Header>
                    <p>Subtotal: <span>{prices.subtotal} €</span></p>
                    <p>Envio: <span>{delivery.delivery.delivery.price.total_price} €</span></p>
                    <p></p>
                    <p>Total del pedido: <span>{getTotalPedido()} €</span></p>
                </Grid.Column>
                <Grid.Column computer={1}></Grid.Column>
                <Grid.Column computer={6} className="combobox">
                    <Header >Envío</Header>
                    <p>Dirección de entrega: <span>{deliveryInfo?.address}/{deliveryInfo?.addressComplement}</span></p>
                    <p>Entrega estimada: <span><b>{delivery.delivery.delivery.first_estimated_delivery_date}</b></span></p>
                    <p>Empresa de transporte: <span>{delivery.delivery.delivery.carrier_name}</span></p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
  )
}

const ItemDelivery = ({ item , materials }) => {

    const getMaterialSelected = materials.find(({ id }) => id === item.material);

    return (
        <Grid columns={16}>
            <Grid.Row>
                <Grid.Column computer={5}>
                    <Image src={item.file.previsualization} />
                </Grid.Column>
                <Grid.Column computer={11}>
                    <h3 >{item.name || 'Sin Nombre'}</h3>
                    <p className='nomg text-resume'><b>Material Seleccionado:</b> 
                        <span> {getMaterialSelected?.title?.es}</span>
                    </p>
                    <p className='nomg text-resume'><b>Grosor Seleccionado:</b>
                        <span> {item?.weight}mm</span>
                    </p>
                    <p className='nomg text-resume'><b>Capas detectadas:</b></p>
                    {
                        item.file.planchas?.map((plancha,index) => {

                            return (
                                <div className='nomg ml-2'>
                                    <p className='nomg'>Plancha ({index}):</p>
                                    {
                                        plancha.capas.map(plancha => (
                                            <p className='nomg'>- {plancha.type}</p>
                                        ))
                                    }
                                </div>
                            )
                        })
                    }
                    <p className='nomg'><b>Extras:</b></p>
                   <div className='ml-2'>
                    {
                            item.extras.map(({ text }) => (
                                <p>- {text}</p>
                            ))
                        }
                   </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
