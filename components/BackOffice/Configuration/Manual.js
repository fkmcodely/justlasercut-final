import React, { useEffect, useState } from 'react';
import { Grid, Header, Button, Table, Modal, Divider, Form, Image, Icon } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

import axios from "axios";
import { BASE_URL } from '../../../constants/config';

const Manual = ({ option }) => {
    const [updater, setUpdater] = useState();
    const [modalAdd, setModalAdd] = useState(false);
    const [language, setLanguage] = useState(0);
    const [manualItems, setManualItems] = useState([]);

    const fetchItems = () => {
        const fetchManualItems = async () => {
            try {
                const fetchItems = await axios(`/api/manual`, {
                    params: {
                        language: language === 0 ? 'ES' : 'EN'
                    }
                });
                const { data: { steps } } = fetchItems;
                setManualItems(steps);
            } catch (err) {
                console.error(`Error al obtener lista del manual: ${err}`)
            }
        };
        fetchManualItems();
    };

    useEffect(() => {
        fetchItems();
    }, [language]);
    useEffect(() => {
        fetchItems();
    }, [updater]);

    return (
        <>
            <Grid columns="16">
                <Grid.Row>
                    <Grid.Column width="12" verticalAlign="middle">
                        <Header style={{ marginBottom: '0px !important' }}>
                            CONFIGURACIÓN DEL MANUAL DE USUARIO
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
                        <ModalAddManual
                            language={language}
                            rendered={<Button primary>+</Button>}
                            open={modalAdd}
                            setUpdater={setUpdater}
                            setOpen={setModalAdd}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width="16">
                        <ManualTable setUpdater={setUpdater} manualItems={manualItems} language={language} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </>
    );
};

const ManualTable = ({ language, manualItems, setUpdater }) => {
    const [openItem, setOpenItem] = useState(false);

    const deleteStepManual = async (idManual) => {
        try {
            const request = await axios.delete(`${BASE_URL}api/manual`, {
                params: {
                    id: idManual
                }
            });
            setUpdater(Math.random());
        } catch (err) {
            console.error(`Error al eliminar paso del manual: ${err}`);
        }
    };

    return (
        <Table celled columns="16">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ORDEN</Table.HeaderCell>
                    <Table.HeaderCell>TITULO</Table.HeaderCell>
                    <Table.HeaderCell>DESCRIPCIÓN</Table.HeaderCell>
                    <Table.HeaderCell>RECURSO</Table.HeaderCell>
                    <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    manualItems.map((stepManual, index) => {
                        const { id, title, image, video, order, description, buttons, language } = stepManual;

                        return (
                            <Table.Row className="table-general">
                                <Table.Cell>{order}</Table.Cell>
                                <Table.Cell>{title}</Table.Cell>
                                <Table.Cell>{description}</Table.Cell>
                                <Table.Cell>
                                    {image && (
                                        <Image src={`${BASE_URL}/${image}`} className="miniature-image" />
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <ModalEditManual
                                        step={stepManual}
                                        open={openItem}
                                        setOpen={setOpenItem}
                                        rendered={<Icon size="large" color="grey" className="custom-dropdown__icon" name='pencil alternate' />}
                                        language={language}
                                    />
                                    <Icon
                                        onClick={() => { deleteStepManual(id) }}
                                        size="large"
                                        color="grey"
                                        className="custom-dropdown__icon"
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

const ModalAddManual = ({ open, setOpen, rendered, language = 'ES', setUpdater }) => {
    const [primary, setPrimary] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [multimedia, setMultimedia] = useState('');
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

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
                const request = await axios.post(`/api/manual`, {
                    ...fields,
                    description: textArea,
                    language: language === 0 ? 'ES' : 'EN'
                });
                if (multimedia) {
                    const data = new FormData();
                    data.append('file', multimedia);
                    const uploadMedia = await axios.post(`/api/multimedia`, data, {
                        params: {
                            id: request.data.id,
                        }
                    });
                }
                setUpdater(Math.random());
                setLoading(false);
                reset();
                setPrimary(false);
                setSecondary(false);
                setTextArea('');
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
                <Header>Añadir nuevo paso del manual</Header>
            </Modal.Header>
            <Modal.Content>
                <p>Rellene los siguientes datos para crear un nuevo paso del manual
                    (Recuerde que dependiendo del idioma seleccionado se creara el paso para un idioma o otro).</p>
                <Form onSubmit={handleSubmit(handleSubmitManual)}>
                    <input placeholder="Numero del manual:" type="number" {...register("order")} />
                    <input type="text" {...register("title")} placeholder="Titulo del paso" />
                    <textarea value={textArea} rows={3} onChange={ev => setTextArea(ev.target.value)} placeholder="Describe la información del paso." />
                    <div>
                        <p>Archivos multimedia:</p>
                        <input onChange={(ev) => { setMultimedia(ev.target.files[0]) }} type="file" name="mediaManual" />
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

const ModalEditManual = ({ rendered, language = 'ES', step }) => {
    const [primary, setPrimary] = useState(typeof step.buttons?.primary?.title !== 'undefined' ? true : false);
    const [secondary, setSecondary] = useState(typeof step.buttons?.secondary?.title !== 'undefined' ? true : false);
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    useEffect(() => {
        console.log('jejeje')
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

    const handleSubmitManual = (fields) => {
        setLoading(true);
        const fetchManual = async () => {
            try {
                const request = await axios.put('/api/manual', {
                    step: step.id,
                    ...fields,
                    language: language
                });
                setLoading(false);
                setOpen(false);
            } catch (err) {
                console.error(`Error al actualizar el paso del manual: ${err}`);
                setLoading(false);
                setOpen(false);
            }
        };
        fetchManual();
    };

    return (
        <Modal {...modalProps} className="manual-modal-edit">
            <Modal.Header>
                <Header>Editar paso del manual</Header>
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(handleSubmitManual)}>
                    <input placeholder="Numero del manual:" type="number" {...register("order")} />
                    <input type="text" {...register("title")} placeholder="Titulo del paso" />
                    <input className="manual-modal-edit__textarea" {...register("description")} placeholder="Describe la información del paso." />
                    {/*
                        <div>
                            <p>Archivos multimedia:</p>
                            <input type="file" />
                        </div>
                    */}

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

export default Manual;