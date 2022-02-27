import axios from 'axios';
import React , { useState , useEffect } from 'react'
import { Grid , Step, Container, Header, Icon, GridColumn, Checkbox, Input, Divider, Button } from 'semantic-ui-react'
import { STEPS_SHOPPING } from "../constants";
import DetailsBuy from './DetailsBuy';
import DetailsDelivery  from "./DetailsDelivery";

export default function StepTree({ active , setActive }) {
  const [optionShipping,setOptionShipping] = useState(0);
  const [deliveryList,setDeliveryList] = useState([]);

  const [manager,setManager] = useState();

  const [paymentSelected,setPaymentSelected] = useState(null);
  
  const payments = [
      {
          title: 'VISA',
          id: 0,
          img: ''
      },
      {
        title: 'MasterCard',
        id: 1,
        img: ''
    },
    {
        title: 'PayPal',
        id: 2,
        img: ''
    },
    {
        title: 'Bizum',
        id: 3,
        img: ''
    }
  ]
  
  return (
    <Container className='mt-4'>
        <Grid columns={16}>
            <Grid.Row>
                <Grid.Column computer={10}>
                    <Header as="h1">Método de pago</Header>
                    <p>Elige un método de pago.</p>
                    <Grid columns={16}>
                        <Grid.Row>
                            <Grid.Column computer={16}>
                                <section className='payment-container'>
                                    {
                                        payments.map(({ title , id  }) => (
                                            <div
                                                className={`${id === paymentSelected ? 'active' : ''}`} 
                                                onClick={() => setPaymentSelected(id)}>
                                                <p>{title}</p>
                                            </div>
                                        ))
                                    }
                                </section>
                            </Grid.Column>
                            <Grid.Column computer={16}>
                                <Button 
                                    primary
                                    onClick={() => {
                                        localStorage.setItem('payment_selected',paymentSelected);
                                        setActive('Resumen');
                                    }}
                                    disabled={paymentSelected === null} 
                                    floated='right' 
                                    className='btn-finish'>REALIZAR PEDIDO</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Divider vertical></Divider>
                <Grid.Column  computer={6}>
                       <DetailsBuy delivery={manager}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
  )
}

const DeliveryOption = ({ data , setManager, manager }) => {
    const { name ,id , first_estimated_delivery_date, price } = data;

    return (
        <Grid.Column computer={16} className="DeliveryOption">
            <Grid columns={16} className="DeliveryOption__column" verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column computer={2}>
                        <Checkbox 
                            checked={id === manager?.id}
                            onClick={() => setManager(data)}
                        />
                    </Grid.Column>
                    <Grid.Column computer={11}>
                       <h3>{name}</h3>
                       <p>Fecha estimada de llegada: {first_estimated_delivery_date}</p>
                    </Grid.Column>
                    <Grid.Column computer={3}>
                        <p>{price.total_price} {price.currency}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    )
}

const BoxSelection = ({ size, route , onClick, title, active}) => {
    return (
        <Grid.Column computer={size} onClick={onClick} 
        className={`boxSelection ${active ? 'active_option': ''}`}>
            <Icon name={route} size="huge" />
            <span>{title}</span>
        </Grid.Column>
    )
}

