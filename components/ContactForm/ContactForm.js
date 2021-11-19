import React, { useState } from 'react';
import { Container, Grid, Form, Input, Button, Header, Divider, Message } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { BASE_URL, BASE_URL_MONGO } from '../../constants/config';
import axios from "axios";

const ContactForm = ({ t }) => {
    const { register, handleSubmit, watch, reset, formState = { errors } } = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [multimedia, setMultimedia] = useState('');

    const onSubmit = data => {
        const sendMessage = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/contact`, {
                    ...data
                });
                if (multimedia) {
                    const media = new FormData();
                    media.append('file', multimedia);
                    await axios.post(`${BASE_URL}/api/multimedia`, media, {
                        params: {
                            id: response.data.id
                        }
                    })
                }
                reset();
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            } catch (err) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }
        };
        sendMessage();
    }

    return (
        <Container fluid className="contact-form">
            <Container>
                <Grid columns="16">
                    <Grid.Row>
                        <Grid.Column width="16" textAlign="center">
                            <Header as="h2">{t.contacto}</Header>
                            <Divider />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="contact-form__form">
                        <Grid.Column largeScreen="12" tablet="14" mobile="16">
                            {success && (
                                <Message
                                    success
                                    header='Tu mensaje se ha enviado correctamente'
                                    content='Nos pondremos en contacto contigo para responder tus dudas'
                                />
                            )}
                            {error && (
                                <Message
                                    error
                                    header='¡Algo a salido mal!'
                                    content='Intentalo mas tarde o escribenos a info@archicercle.com'
                                />
                            )}
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Field>
                                    <input type="email" required placeholder="Correo Electronico" {...register("email")} />
                                </Form.Field>
                                <Form.Field>
                                    <input type="number" min="0" placeholder="Número de referencia" {...register("numberRef")} />
                                </Form.Field>
                                <Form.Field>
                                    <input required type="text" placeholder="Asunto" {...register("subject")} />
                                </Form.Field>
                                <Form.Field>
                                    <textarea required rows="5" placeholder="Mensaje" {...register("message")} />
                                </Form.Field>
                                <Form.Field>
                                    <Input onChange={(ev) => { setMultimedia(ev.target.files[0]) }} type="file" name="mediaManual" />
                                </Form.Field>
                                <Button loading={loading} className="button-main" loading={loading} type="submit" content='ENVIAR' primary />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};

export default ContactForm;