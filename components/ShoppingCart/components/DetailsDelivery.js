
import React from "react";
import { Grid , Form, Header, GridColumn, Checkbox, Input, Button } from 'semantic-ui-react'
import { useForm } from "react-hook-form";

export default function DetailsDelivery({ setActive }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        localStorage.setItem('delivery_x',JSON.stringify({
            ...data,
            delivery: JSON.parse(localStorage.getItem('envio'))
        }));

        setActive('Pago')
    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid columns={16}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header>Detalles de envío</Header>
                    </Grid.Column>
                </Grid.Row>
        
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <input placeholder='Pais' fluid />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <input placeholder='Teléfono' fluid/>
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <input placeholder='Nombre' 
                            {...register("name", { required: true })} fluid/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <input placeholder='Apellido' 
                            {...register("lastname", { required: true })} fluid/>
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <input 
                                {...register("address", { required: true })}
                                placeholder='Dirección' fluid/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <input
                                {...register("addressComplement", { required: true })} 
                                placeholder='Piso/Puerta u otro (opcional)' fluid/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Input placeholder='Provincia' fluid/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input placeholder='Localidad' fluid/>
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Button type="submit" floated="right" primary>Continuar</Button>
                        </Grid.Column>
                    </Grid.Row>
            </Grid>
        </Form>
    )
}
