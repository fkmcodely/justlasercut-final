import React, { useEffect, useState } from 'react';
import { Grid, Form, Input, Button, Header, Image, Divider } from 'semantic-ui-react';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CKEditor } from 'ckeditor4-react';
import { BASE_URL } from '../../../constants/config';

const SiteForm = ({ option }) => {
    const [site, setSite] = useState(false);
    const { locale } = useRouter();
    console.log(locale)
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState(locale);
    const [text, setText] = useState();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            sitename: site.sitename,
            email: site.email,
            maintance: site.maintance,
            phone: site.phone,
        },
    });

    useEffect(() => {
        fetchDataSite();
    }, []);

    const saveSiteInfo = (data) => {
        setLoading(true);
        const save = async () => {
            try {
                const updatedInfo = await axios.put('/api/site', {
                    _id: site._id,
                    ...data
                });
                setLoading(false);

            } catch (err) {
                console.error(`Error al guardar los datos: ${err}`)
                setLoading(false);
            }
        };
        save();
    };

    const fetchDataSite = () => {
        const fetchData = async () => {
            try {
                const request = await axios('/api/site');
                const configuration = request?.data?.configurationSite[0];
                setSite(configuration);
            } catch (error) {
                console.error('Error, al obtener propiedades de la web:');
            }
        };
        fetchData();
    };

    return (
        <Grid columns="16" className="site-data">
            <Grid.Row>
                <Grid.Column width="16" className="backoffice-group">
                    <Header as="h3">Configuración General</Header>
                    <Divider />
                    <Form onSubmit={handleSubmit(saveSiteInfo)}>
                        <Form.Field>
                            <span>Nombre:</span>
                            <input defaultValue={site.sitename} {...register('sitename')} placeholder="Nombre de la web" />
                        </Form.Field>
                        <Form.Field>
                            <span>Email:</span>
                            <input defaultValue={site.email} {...register('email')} placeholder="Email de contacto" />
                        </Form.Field>
                        <Form.Field>
                            <span>Activar o desactivar mantenimiento del sitio:</span>
                            <input defaultValue={site.maintance} {...register('maintance')} type="checkbox" placeholder="Email de contacto" />
                        </Form.Field>
                        <Form.Field>
                            <span>Telefono de contacto:</span>
                            <input defaultValue={site?.phone?.replace(' ', '')} {...register('phone')} type="number" placeholder="Telefono de contacto" />
                        </Form.Field>

                        <Button loading={loading} content="Guardar" secondary floated="right" />
                    </Form>
                </Grid.Column>
                <Grid.Column width="1">

                </Grid.Column>
                <Grid.Column width="16" className="backoffice-group">
                    <Grid columns="16">
                        <Grid.Row >
                            <Grid.Column width="12">
                                <Header as="h3">Configuración Información Principal</Header>
                                <Divider />
                            </Grid.Column>
                            <Grid.Column width="4">
                                <div className="languages">
                                    <div onClick={() => setLanguage('es')} className={`languages__container ${language === 'es' && ('languages__active')}`}>
                                        <Image src={`${BASE_URL}flag_es.jpg`} alt="flag_spain" className="languages__flag" />
                                    </div>
                                    <div onClick={() => setLanguage('en')} className={`languages__container ${language === 'en' && ('languages__active')}`}>
                                        <Image src={`${BASE_URL}flag_en.png`} alt="flag_english" className="languages__flag" />
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width="16">
                                <Form>
                                    <p>Descripción principal de la página:</p>
                                    <CKEditor
                                        data={text}
                                        onChange={evt => setText(evt.editor.getData())}
                                    />
                                    <Button primary type="submit" content="Aceptar" />
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default SiteForm;