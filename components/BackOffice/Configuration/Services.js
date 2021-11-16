import React, { useEffect, useState } from 'react';
import { Grid, Header, Button, Table, Modal, Divider, Form, Image, Icon } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { BASE_URL } from '../../../constants/config';

const Services = () => {
    const [modalAdd, setModalAdd] = useState(false);
    const [language, setLanguage] = useState(0);
    const [serviceItems, setServiceItems] = useState([]);
    const [update, setUpdate] = useState();

    useEffect(() => fetchItems(), [language]);
    useEffect(() => fetchItems(), [update]);

    const fetchItems = () => {
        const fetchServices = async () => {
            try {
                const fetchItems = await axios(`/api/services`, {
                    params: {
                        language: language === 0 ? 'ES' : 'EN'
                    }
                });
                const { data: { services } } = fetchItems;
                setServiceItems(services);
            } catch (err) {
                console.error(`Error al obtener lista del manual: ${err}`)
            }
        };
        fetchServices();
    };

    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="12">
                    <Header>
                        CONFIGURACIÓN DE SERVICIOS
                    </Header>
                </Grid.Column>
                <Grid.Column width="4" style={{ display: 'flex', justifyContent: 'right' }} floated="right">
                    <div className="languages">
                        <div onClick={() => setLanguage(0)} className={`languages__container ${language === 0 && ('languages__active')}`}>
                            <Image src={`${BASE_URL}/flag_es.jpg`} alt="flag_spain" className="languages__flag" />
                        </div>
                        <Divider vertical />
                        <div onClick={() => setLanguage(1)} className={`languages__container ${language === 1 && ('languages__active')}`}>
                            <Image src={`${BASE_URL}/flag_en.png`} alt="flag_english" className="languages__flag" />
                        </div>
                    </div>
                    <ModalAddService setUpdate={setUpdate} language={language} rendered={<Button primary>+</Button>} open={modalAdd} setOpen={setModalAdd} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="16">
                    <ServiceTable services={serviceItems} language={language} setUpdate={setUpdate} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const ServiceTable = ({ language, services = [], setUpdate }) => {
    const [openItem, setOpenItem] = useState(false);

    const deleteStepService = async (idService) => {
        try {
            const request = await axios.delete(`${BASE_URL}api/services`, {
                params: {
                    id: idService
                }
            });
            setUpdate(Math.random());
        } catch (err) {
            console.error(`Error al eliminar paso del manual: ${err}`);
        }
    };

    return (
        <Table celled columns="16" className="table-general">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ORDEN</Table.HeaderCell>
                    <Table.HeaderCell>TITULO</Table.HeaderCell>
                    <Table.HeaderCell>DESCRIPCIÓN</Table.HeaderCell>
                    <Table.HeaderCell>RECURSOS</Table.HeaderCell>
                    <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    services?.map((stepService, index) => {
                        const { id, title, image, video, order, description, buttons, language } = stepService;
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{order}</Table.Cell>
                                <Table.Cell>{title}</Table.Cell>
                                <Table.Cell>{description}</Table.Cell>
                                <Table.Cell>
                                    {image && (<Image src={`${BASE_URL}${image}.png`} alt="" className="miniature-image" />)}
                                </Table.Cell>
                                <Table.Cell>
                                    <ModalEditService className="icon_action" idService={id} step={stepService} open={openItem} setOpen={setOpenItem} rendered={<Icon size="large" color="grey" className="custom-dropdown__icon" name='pencil alternate' />} language='ES' />
                                    <Icon
                                        onClick={() => {
                                            console.log('hiz clok')
                                            deleteStepService(stepService.id)
                                        }}
                                        size="large"
                                        color="grey"
                                        className="custom-dropdown__icon icon_action"
                                        name='trash'
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }

            </Table.Body>
        </Table>
    )
};


const ModalAddService = ({ open, setOpen, rendered, language = 'ES', setUpdate }) => {
    const [primary, setPrimary] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [multimedia, setMultimedia] = useState('');
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const modalProps = {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
        open: open,
        size: 'large',
        trigger: rendered
    };

    const handleSubmitManual = (fields) => {
        setLoading(true);
        const fetchManual = async () => {
            try {
                const request = await axios.post('/api/services', {
                    ...fields,
                    description: textArea,
                    language: language === 0 ? 'ES' : 'EN'
                });
                const data = new FormData();
                if (multimedia) {
                    data.append('file', multimedia);
                    const uploadMedia = await axios.post('/api/multimedia', data, {
                        params: {
                            id: request.data.id,
                            folder: 'services'
                        }
                    });
                }
                setUpdate(Math.random());
                reset();
                setTextArea('');
                setLoading(false);
                setOpen(false);
            } catch (err) {
                console.error(`Error al crear nuevo paso del manual: ${err}`);
                setLoading(false);
                setOpen(false);
            }
        };
        fetchManual();
    };

    return (
        <Modal {...modalProps} className="manual-modal-add">
            <Modal.Header>
                <Header>Añadir un nuevo servicio</Header>
            </Modal.Header>
            <Modal.Content>
                <p>Rellene los siguientes datos para crear un nuevo servicio
                    (Recuerde que dependiendo del idioma seleccionado se creara el servicio para un idioma o otro).</p>
                <Form onSubmit={handleSubmit(handleSubmitManual)} enctype="multipart/form-data">
                    <input required placeholder="Orden:" type="number" {...register("order")} />
                    <input required type="text" {...register("title")} placeholder="Titulo del servicio" />
                    <textarea required rows={4} value={textArea} onChange={ev => setTextArea(ev.target.value)} placeholder="Describe la información del servicio." />
                    <div>
                        <p>Archivos multimedia:</p>
                        <input onChange={ev => setMultimedia(ev.target.files[0])} type="file" name="mediaService" />
                    </div>
                    <div className="manual-modal-add__buttons">
                        <p className="primary">
                            ¿Desea añadir un boton primario?: <input type="checkbox" checked={primary} onChange={(ev) => setPrimary(ev.target.checked)} />

                            {primary && (<div>
                                <input {...register("buttons.primary.title")} placeholder="Titulo del boton" type="text" />
                                <input {...register("buttons.primary.href")} placeholder="Link del boton" type="text" />
                                <div>
                                    <label>
                                        Seleccione el color del boton:
                                        <input type="color" {...register("buttons.primary.color")} />
                                    </label>
                                </div>
                            </div>)
                            }
                        </p>
                        <p className="secondary">
                            ¿Desea añadir un boton secundario?: <input type="checkbox" checked={secondary} onChange={ev => setSecondary(ev.target.checked)} />
                            {secondary && (<div>
                                <input placeholder="Titulo del boton" type="text" {...register("buttons.secondary.title")} />
                                <input placeholder="Link del boton" type="text" {...register("buttons.secondary.href")} />
                                <div>
                                    <label>
                                        Seleccione el color del boton:
                                        <input type="color" {...register("buttons.secondary.color")} />
                                    </label>
                                </div>
                            </div>)
                            }
                        </p>
                    </div>
                    <Button loading={loading} type="submit" floated="right" content="GUARDAR" primary />
                </Form>
            </Modal.Content>
        </Modal>
    )
}


const ModalEditService = ({ idService, rendered, language = 'ES', step }) => {
    const [primary, setPrimary] = useState(typeof step.buttons?.primary?.title !== 'undefined' ? true : false);
    const [secondary, setSecondary] = useState(typeof step.buttons?.secondary?.title !== 'undefined' ? true : false);
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { register, reset, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            order: step.order,
            title: step.title,
            description: step.description,
            buttons: {
                primary: {
                    title: step.buttons?.primary?.title || '',
                    href: step.buttons?.primary?.href || '',
                    color: step.buttons?.primary?.color || '',
                },
                secondary: {
                    title: step.buttons?.secondary?.title || '',
                    href: step.buttons?.secondary?.href || '',
                    color: step.buttons?.secondary?.color || '',
                }
            }
        }
    });

    useEffect(() => {
        setValue("order", step.order);
        setValue("description", step.description);
        setValue("title", step.title);

        setValue("buttons.primary.title", step.buttons?.primary?.title);
        setValue("buttons.primary.href", step.buttons?.primary?.href);
        setValue("buttons.primary.color", step.buttons?.primary?.color);

        setValue("buttons.secondary.title", step.buttons?.secondary?.title);
        setValue("buttons.secondary.href", step.buttons?.secondary?.href);
        setValue("buttons.secondary.color", step.buttons?.secondary?.color);
    }, [open]);

    const modalProps = {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
        open: open,
        size: 'large',
        trigger: rendered
    };

    useEffect(() => {
        if (!open) {
            reset({
                ...step
            })
        }
    }, [open])

    const handleSubmitManual = (fields) => {
        setLoading(true);
        const fetchManual = async () => {
            try {
                const request = await axios.put('/api/service', {
                    step: step.id,
                    ...fields,
                    language: language
                });
                setLoading(false);
                setOpen(false);
            } catch (err) {
                console.error(`Error al actualizar el servicio: ${err}`);
                setLoading(false);
                setOpen(false);
            }
        };
        fetchManual();
    };

    return (
        <Modal {...modalProps} className="manual-modal-edit">
            <Modal.Header>
                <Header>Editar servicio</Header>
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(handleSubmitManual)}>
                    <input placeholder="Numero del manual:" type="number" {...register("order")} />
                    <input type="text" {...register("title")} placeholder="Titulo del paso" />
                    <input className="manual-modal-edit__textarea" {...register("description")} placeholder="Describe la información del paso." />
                    {
                        /*
                        <div>
                            <p>Archivos multimedia:</p>
                            <input type="file" />
                        </div>
                        */
                    }
                    <div className="manual-modal-edit__buttons">
                        <p className="primary">
                            ¿Desea añadir un boton primario?: <input type="checkbox" checked={primary} onChange={(ev) => setPrimary(ev.target.checked)} />

                            {primary && (<div >
                                <input {...register("buttons.primary.title")} placeholder="Titulo del boton" type="text" />
                                <input {...register("buttons.primary.href")} placeholder="Link del boton" type="text" />
                                <div>
                                    <label>
                                        Seleccione el color del boton:
                                        <input type="color" {...register("buttons.primary.color")} />
                                    </label>
                                </div>
                            </div>)
                            }
                        </p>
                        <p className="secondary">
                            ¿Desea añadir un boton secundario?: <input type="checkbox" checked={secondary} onChange={ev => setSecondary(ev.target.checked)} />
                            {secondary && (<div >
                                <input placeholder="Titulo del boton" type="text" {...register("buttons.secondary.title")} />
                                <input placeholder="Link del boton" type="text" {...register("buttons.secondary.href")} />
                                <div>
                                    <label>
                                        Seleccione el color del boton:
                                        <input type="color" {...register("buttons.secondary.color")} />
                                    </label>
                                </div>
                            </div>)
                            }
                        </p>
                    </div>
                    <Button loading={loading} type="submit" floated="right" content="ACTUALIZAR" primary />
                </Form>
            </Modal.Content>
        </Modal>
    )
}


export default Services;