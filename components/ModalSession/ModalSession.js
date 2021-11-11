import React , { useState } from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, Divider } from 'semantic-ui-react'
import { session , signIn, signOut } from "next-auth/react"
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../constants/config';
import axios from 'axios';

const ModalSession = () => {
    const [open,setOpen] = useState(false);
    const [option,setOption] = useState(1);

    const modalOptions = {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
        open: open,
        trigger: <p>Mi Cuenta</p>,
        size: 'tiny'
    }

    return (
        <Modal {...modalOptions} className="modal-session">
            <Modal.Header>
               <section className="modal-session__header">
                   <h4
                    onClick={() => setOption(0)}
                    style={{
                        color: option === 0 ? 'black' : 'gray'
                    }}
                   >Soy Nuevo</h4>
                   <h4
                    style={{
                        color: option === 1 ? 'black' : 'gray'
                    }}
                    onClick={() => setOption(1)}
                   >Soy Cliente</h4>
               </section>
            </Modal.Header>
            <Modal.Content>
                {/* Necesitamos dos componentes una para el registro y otra para el inicio de sesion */}
                { option === 1 && (<FormSignIn />)}
                { option === 0 && (<FormRegister />)}
            </Modal.Content>
        </Modal>
    );
};

const FormSignIn = () => {

    return (
        <section className="signin">
            <p className="signin__text">Accede a tu zona privada desde aquí:</p>

            <Button className="signin__btn signin__btn--email" onClick={() => signIn()}>CONTINUAR CON EMAIL</Button>
            <Button className="signin__btn signin__btn--google" onClick={() => signIn('google',{
                callback: BASE_URL
            })}>CONTINUAR CON GOOGLE</Button>
            <Button className="signin__btn signin__btn--facebook"onClick={() => signIn('facebook',{
                callback: BASE_URL
            })}>CONTINUAR CON FACEBOOK</Button>
            <Divider/>
            <div>
                <p>
                    Tu seguridad es importante para nosotros. En Justlasercut nos tomamos muy en serio la confidencialidad y 
                    la seguridad de tus datos. Por eso tenemos implementado un protocolo de seguridad HTTPS/SSL que garantiza
                    tu visita en nuestra web con total confianza. 
                </p>
            </div>
        </section>
    )
}
const FormRegister = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const submit = (form) => {
        const registerUser = async () => {
            try {
                const createUser = await axios.post(`/api/customers`,{
                    ...form
                });
                if(createUser) {
                    console.log(`Uusario ${createUser}`)
                }
            } catch (error) {
                console.error(`Error al registrar usuario:`,error);
            }
        };
        registerUser();
    }

    return (
        <section className="signin">
            <p className="signin__text">Crea una cuenta de Justlasercut</p>
            <Form className="signin__register-form" onSubmit={handleSubmit(submit)}>
                <input {...register('name',{ required: true })} placeholder='Nombre' fluid  />
                <input {...register('email',{ required: true })} placeholder='Correo Electronico' type="email" fluid/>
                <input {...register('password', { required: true })} placeholder='Contraseña' type="password" fluid/>
                <Button type="submit" content="Crear Cuenta" primary />
            </Form>
            <Divider />
            <section className="signin">
                <Button className="signin__btn signin__btn--email" onClick={() => signIn()}>CONTINUAR CON EMAIL</Button>
                <Button className="signin__btn signin__btn--google" onClick={() => signIn('google',{
                    callback: BASE_URL
                })}>CONTINUAR CON GOOGLE</Button>
                <Button className="signin__btn signin__btn--facebook"onClick={() => signIn('facebook',{
                    callback: BASE_URL
                })}>CONTINUAR CON FACEBOOK</Button>
            </section>
        </section>
    )
}

export default ModalSession;