import React, { useState, useEffect } from 'react';
import { Grid, Container, Header, Icon, Form, Divider, Button } from "semantic-ui-react";
import { useSession, signIn, singOut, getSession, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
const { v4: uuidv4 } = require('uuid');
import { useRouter } from 'next/router'

const perfil = () => {
    const [user, setUser] = useState();
    const { data: session } = useSession();

    const [update, setUpdate] = useState();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/');
            return
        }
        const handler = async () => {
            const { data } = await axios('/api/customers');
            const user = data?.request?.filter((user) => user?.email === session?.user?.email)[0];
            setUser(user)
        };
        handler();
    }, [session, update]);

    console.log(user);

    return (
        <Container style={{ minHeight: '90vh' }}>
            <Header style={{ marginBottom: '4rem' }}>
                Mi cuenta
            </Header>
            <Orders />
            <DataPersonal user={user} setUpdate={setUpdate} />
            <UserAddress user={user} setUpdate={setUpdate} />
            <Button
                style={{ marginBottom: '2rem' }}
                color='red'
                onClick={() => {
                    signOut()
                }} content='Cerrar Sesión' />
        </Container>
    );
};


const UserAddress = ({ user, setUpdate }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    const onSubmit = async (data) => {
        try {
            const putDataPersonal = await axios.put(`/api/customers`, {
                adressess: [
                    ...user.address,
                    {
                        id: uuidv4(),
                        ...data
                    }
                ],
                id: user.id
            })
            setUpdate(Math.random())
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        setValue('email', user?.email);
        setValue('name', user?.name);
        setValue('phone', user?.phone);
    }, [user]);

    return (
        <Grid columns="16">
            <Grid.Row style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eee', paddingBottom: '0px',
                justifyContent: 'center', marginBottom: '5rem'
            }}>
                <Grid.Column width="16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Header>2.Mis direcciones</Header>
                    <Icon size="large" className="custom-dropdown__icon" name='plus' onClick={() => setOpen(!open)} />
                </Grid.Column>
                {
                    open && (
                        <>
                            <Grid.Column width="16" style={{ border: '1px solid #eee', backgroundColor: 'white', padding: '2rem' }}>
                                <section>
                                    <h3>Añadir nueva dirección</h3>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <input style={{ marginBottom: '1rem' }} {...register('address')} placeholder="Dirección" />
                                        <input style={{ marginBottom: '1rem' }} {...register('number')} placeholder="Piso/Puerta u otro" />
                                        <input style={{ marginBottom: '1rem' }} {...register('cp')} placeholder="Codigo postal" />
                                        <input style={{ marginBottom: '1rem' }} {...register('locality')} placeholder="Localidad" />
                                        <input type="submit" />
                                    </Form>
                                </section>
                            </Grid.Column>
                            <Divider />
                            <Grid.Column width="16" style={{ border: '1px solid #eee', backgroundColor: 'white', padding: '2rem' }}>
                                <div style={{ margin: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                    {
                                        user?.adressess?.map((address, index) => (

                                            <p>{index + 1}) Calle: {address.address} | Número: {address.number} | CP: {address.cp} | Localidad: {address.locality} </p>

                                        ))
                                    }
                                </div>
                            </Grid.Column>
                        </>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

const DataPersonal = ({ user }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    const onSubmit = async (data) => {
        try {
            const putDataPersonal = await axios.put(`/api/customers`, {
                ...data,
                id: user.id
            })
            console.log(putDataPersonal)
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        setValue('email', user?.email);
        setValue('name', user?.name);
        setValue('phone', user?.phone);
    }, [user]);

    return (
        <Grid columns="16">
            <Grid.Row style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eee', paddingBottom: '0px',
                justifyContent: 'center', marginBottom: '1rem'
            }}>
                <Grid.Column width="16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Header>2.Mis datos personales</Header>
                    <Icon size="large" className="custom-dropdown__icon" name='plus' onClick={() => setOpen(!open)} />
                </Grid.Column>
                {
                    open && (
                        <Grid.Column width="16" style={{ border: '1px solid #eee', backgroundColor: 'white', padding: '2rem' }}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <input style={{ marginBottom: '1rem' }} {...register('email')} placeholder="Email" />
                                <input style={{ marginBottom: '1rem' }} {...register('name')} placeholder="Nombre" />
                                <input type="number" style={{ marginBottom: '1rem' }} {...register('phone')} placeholder="Telefono" />
                                <input type="submit" />
                            </Form>
                        </Grid.Column>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

const Orders = () => {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    return (
        <Grid columns="16">
            <Grid.Row style={{
                marginBottom: '1rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eee', paddingBottom: '0px',
                justifyContent: 'center'
            }}>
                <Grid.Column width="16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Header>1.Mis pedidos</Header>
                    <Icon size="large" className="custom-dropdown__icon" name='plus' onClick={() => setOpen(!open)} />
                </Grid.Column>
                {
                    open && (
                        <Grid.Column width="16" style={{ border: '1px solid #eee', backgroundColor: 'white', padding: '2rem' }}>
                            <p>
                                {
                                    orders.length ? 'Listado de pedidos' : 'Actualmente no tiene ningun pedido.'
                                }
                            </p>
                        </Grid.Column>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

export default perfil;