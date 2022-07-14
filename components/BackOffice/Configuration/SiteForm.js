import React, { useEffect, useState } from 'react';
import { Grid, Form as form, Input, Button, Header, Image, Divider } from 'semantic-ui-react';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CKEditor } from 'ckeditor4-react';
import { BASE_URL } from '../../../constants/config';
import { useFormik } from "formik";

const SiteForm = ({ option }) => {
    const [site, setSite] = useState(false);
    const { locale } = useRouter();
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState(locale);
    const [text, setText] = useState(false);
    const [textEn, setTextEn] = useState(false);

    const [titlepage, setTitlepage] = useState();
    const [titlepageEn, setTitlepageEn] = useState();

    // const { register, handleSubmit, watch, formState: { errors } } = useForm({
    //     defaultValues: {
    //         sitename: site?.sitename,
    //         email: site?.email,
    //         maintance: site?.maintance,
    //         phone: site?.phone,
    //         minimumThickness: site?.minimumThickness,
    //         maximumThickness: site?.maximumThickness,
    //     },
    // });

    const formik = useFormik({
        initialValues: (site) => {
            return ({
                sitename: site?.sitename ||'2',
                email: site?.email,
                maintance: site?.maintance,
                phone: site?.phone,
                minimumThickness: site?.minimumThickness,
                maximumThickness: site?.maximumThickness,
            })
        },
        onSubmit: values => {
            saveSiteInfo(values)
            setOpen(false);
            resetForm();
        },
    });
    const { values , handleSubmit, setFieldValue, resetForm, ...props } = formik;
    
    const getBannerInfo = async () => {
        try {
            const getResult = await axios('/api/banner');
            const filterArrayResult = getResult.data.response
            setTitlepage(filterArrayResult.filter(entry => entry.language === 'es')[0]);
            setTitlepageEn(filterArrayResult.filter(entry => entry.language === 'en')[0]);
            setText(filterArrayResult.filter(entry => entry.language === 'es')[0]?.title);
            setTextEn(filterArrayResult.filter(entry => entry.language === 'en')[0]?.title);
        } catch (error) {
            console.log(error);
        }
    }

    const saveSiteInfo = (data) => {
        setLoading(true);
        const save = async () => {
            try {
                const updatedInfo = await axios.post('/api/site', {
                    _id: site?._id,
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

    const updatePageTitle = async () => {
        try {
            let idToEdit;
            if (language === 'es') {
                idToEdit = titlepage?.idBanner;
            } else {
                idToEdit = titlepageEn?.idBanner;
            }
            const newTitle = await axios.post('/api/banner', {
                title: language === 'es' ? text : textEn
            }, {
                params: {
                    id: idToEdit
                }
            });


        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchDataSite();
        getBannerInfo();
    }, [language]);

    return (
        <Grid columns="16" className="site-data">
            <Grid.Row>
                <Grid.Column width="16" className="backoffice-group">
                    <Header as="h3">Configuración General</Header>
                    <Divider />
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Nombre:</span>
                            <input
                                onChange={(ev) => {
                                    setFieldValue('sitename',ev.target.value);
                                }} 
                                value={values.sitename}  
                                placeholder="Nombre de la web" />
                        </label>
                        <label>
                            <span>Email:</span>
                            <input 
                             onChange={(ev) => {
                                setFieldValue('email',ev.target.value);
                            }} 
                            value={values.email}  
                            placeholder="Telefono de contacto" />
                        </label>
                        <form.Field>
                            <span>Activar o desactivar mantenimiento del sitio:</span>
                            <input  
                                onChange={(ev) => {
                                    setFieldValue('maintance',ev.target.value);
                                }} 
                                value={values.maintance}  
                                type="checkbox" 
                                placeholder="Email de contacto" 
                            />
                        </form.Field>
                        <form.Field>
                            <span>Telefono de contacto:</span>
                            <input 
                             onChange={(ev) => {
                                setFieldValue('phone',ev.target.value);
                            }} 
                            value={values.phone}  
                            type="number" 
                            placeholder="Telefono de contacto" />
                        </form.Field>
                        <form.Field>
                            <span>Establece el grosor minimo de las planchas</span>
                            <input 
                                onChange={(ev) => {
                                    setFieldValue('minimumThickness',ev.target.value);
                                }} 
                                value={values.minimumThickness} 
                                type="number" 
                                placeholder="Grosor minimo" 
                            />
                        </form.Field>
                        <form.Field>
                            <span>Establece el grosor maximo de las planchas</span>
                            <input 
                                onChange={(ev) => {
                                    setFieldValue('maximumThickness',ev.target.value);
                                }} 
                                value={values.maximumThickness} 
                                type="number" 
                                placeholder="Grosor maximo" 
                            />
                        </form.Field>
                        <Button loading={loading} content="Guardar" secondary floated="right" />
                    </form>
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
                                        <Image src={`${BASE_URL}/flag_es.jpg`} alt="flag_spain" className="languages__flag" />
                                    </div>
                                    <div onClick={() => setLanguage('en')} className={`languages__container ${language === 'en' && ('languages__active')}`}>
                                        <Image src={`${BASE_URL}/flag_en.png`} alt="flag_english" className="languages__flag" />
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width="16">
                                <form>
                                    <p>Descripción principal de la página:</p>
                                    {
                                        (language === 'es') && (
                                            <CKEditor
                                                initData={text}
                                                data={text}
                                                onChange={evt => setText(evt.editor.getData())}
                                            />
                                        )
                                    }
                                   
                                    {
                                        (language === 'en') && (
                                            <CKEditor
                                                initData={textEn}
                                                data={textEn}
                                                onChange={evt => setTextEn(evt.editor.getData())}
                                            />
                                        )
                                    }

                                    <Button onClick={() => updatePageTitle()} primary content='Actualizar' content="Aceptar" />
                                </form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default SiteForm;