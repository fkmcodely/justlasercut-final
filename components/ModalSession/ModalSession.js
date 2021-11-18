import React, { useState } from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, Divider } from 'semantic-ui-react'
import { session, signIn, signOut } from "next-auth/react"
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../constants/config';
import axios from 'axios';
import { useRouter } from 'next/router';


const languages = {
    'es': require('../../locale/es/commons.json'),
    'en': require('../../locale/en/commons.json'),
};

const ModalSession = () => {
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState(1);
    const { locale } = useRouter();
    const t = languages[locale];

    const modalOptions = {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
        open: open,
        trigger: (
            <div className="header-identification-button">
                <Icon name="user circle" size="big" />
                <p>{t.micuenta}</p>
            </div>
        ),
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
                    >{t.soynuevo}</h4>
                    <h4
                        style={{
                            color: option === 1 ? 'black' : 'gray'
                        }}
                        onClick={() => setOption(1)}
                    >{t.soycliente}</h4>
                </section>
            </Modal.Header>
            <Modal.Content>
                {/* Necesitamos dos componentes una para el registro y otra para el inicio de sesion */}
                {option === 1 && (<FormSignIn t={t} />)}
                {option === 0 && (<FormRegister t={t} />)}
            </Modal.Content>
        </Modal>
    );
};

const FormSignIn = ({ t }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section className="signin">
            <p className="signin__text">{t.zonaprivada}</p>
            <Form>
                <Input className="margin-bottom-1" fluid placeholder="email" type="email" required value={email} onChange={ev => setEmail(ev.target.value)} />
                <Input className="margin-bottom-1" fluid placeholder="Contraseña" type="password" required value={password} onChange={ev => setPassword(ev.target.value)} />
                <Button
                    disabled={(email && password) === '' ? true : false}
                    fluid
                    className="signin__btn signin__btn--email"
                    onClick={() => {
                        signIn('credentials',
                            {
                                username: email,
                                password: password,
                                callbackUrl: `${window.location.origin}`
                            })
                    }}>
                    <Icon as="i" name="mail" size="large" color="white" />
                    {t.loginemail}
                </Button>
            </Form>
            <Divider />
            <Button className="signin__btn signin__btn--google" onClick={() => signIn('google', {
                callback: BASE_URL
            })}>
                <Icon as="i" name="google" size="large" color="white" />{t.logingoogle}</Button>
            <Button className="signin__btn signin__btn--facebook" onClick={() => signIn('facebook', {
                callback: BASE_URL
            })}>
                <Icon as="i" name="facebook official" size="large" color="white" />{t.loginfacebook}</Button>
            <Divider />
            <div>
                <p>
                    {t.seguridad}
                </p>
            </div>
        </section>
    )
}
const FormRegister = ({ t }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [creatingUser, setCreatingUser] = useState();

    const submit = (form) => {
        const registerUser = async () => {
            setCreatingUser(true);
            try {
                const createUser = await axios.post(`/api/customers`, {
                    ...form
                });
                if (createUser) {
                    setCreatingUser(false);
                }
            } catch (error) {
                console.error(`Error al registrar usuario:`, error);
                setCreatingUser(false);
            }
        };
        registerUser();
    }

    return (
        <section className="signin">
            <p className="signin__text">{t.creacuenta}</p>
            <Form className="signin__register-form" onSubmit={handleSubmit(submit)}>
                <input {...register('name', { required: true })} placeholder='Nombre' fluid />
                <input {...register('email', { required: true })} placeholder='Correo Electronico' type="email" fluid />
                <input {...register('password', { required: true })} placeholder='Contraseña' type="password" fluid />
                <Button loading={creatingUser} type="submit" content={t.crearcuenta} primary />
            </Form>
            <Divider />
            <section className="signin">
                <Button className="signin__btn signin__btn--google" onClick={() => signIn('google', {
                    callback: BASE_URL
                })}>
                    <Icon as="i" name="google" size="large" color="white" />
                    {t.logingoogle}
                </Button>
                <Button className="signin__btn signin__btn--facebook" onClick={() => signIn('facebook', {
                    callback: BASE_URL
                })}>
                    <Icon as="i" name="facebook official" size="large" color="white" />
                    {t.loginfacebook}
                </Button>
            </section>
        </section>
    )
}

export default ModalSession;