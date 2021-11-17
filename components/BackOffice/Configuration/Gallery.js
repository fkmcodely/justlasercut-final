import React, { useState, useEffect } from 'react';
import axios from "axios";
const { v4: uuidv4 } = require('uuid');
import { Grid, Header, Button, Table, Modal, Divider, Form, Image, Icon, StepTitle } from 'semantic-ui-react';
import { BASE_URL } from '../../../constants/config';

const Gallery = () => {
    const [language, setLanguage] = useState(0);
    const [update, setUpdate] = useState();
    const [galleryList, setGalleryList] = useState();

    useEffect(() => fetchGallery(), []);
    useEffect(() => fetchGallery(), [update]);

    const fetchGallery = async () => {
        try {
            const fetchGalleryCall = await axios('/api/resources');
            const list = fetchGalleryCall.data.resources || [];
            setGalleryList(list);
        } catch (error) {
            console.error('No se puede obtener los datos del servidor')
        }
    };

    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width={14}>
                    <Header>CONFIGURACIÓN HOMEPAGE: GALERIA</Header>
                </Grid.Column>
                <Grid.Column width={2}>
                    <AddResource update={setUpdate} render={<Button content="+" />} />
                    <div className="languages">
                        <div onClick={() => setLanguage(0)} className={`languages__container ${language === 0 && ('languages__active')}`}>
                            <Image src={`${BASE_URL}/flag_es.jpg`} alt="flag_spain" className="languages__flag" />
                        </div>
                        <Divider vertical />
                        <div onClick={() => setLanguage(1)} className={`languages__container ${language === 1 && ('languages__active')}`}>
                            <Image src={`${BASE_URL}/flag_en.png`} alt="flag_english" className="languages__flag" />
                        </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="16">
                    <GalleryTable update={setUpdate} list={galleryList} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const AddResource = ({ update, render }) => {
    const [seo, setSeo] = useState();
    const [media, setMedia] = useState();
    const [href, setHref] = useState();
    const [open, setOpen] = useState();

    const modalProps = {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
        open: open,
        size: 'small',
        trigger: render
    }

    const createResource = async () => {
        try {
            const id = uuidv4()
            const createCall = await axios.post('/api/resources', {
                title: seo,
                media: id,
                link: href
            });
            if (media) {
                const data = new FormData();
                data.append('file', media);
                await axios.post('/api/resources', data, {
                    params: {
                        id: id
                    }
                });
            }
            setSeo();
            setMedia();
            setHref();
            update(Math.random());
            setOpen(false);
        } catch (error) {
            console.error('Error al crear recurso.');
        }
    };

    return (
        <Modal {...modalProps}>
            <Modal.Header>
                Añadir elemento a la galeria
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <input
                        value={seo}
                        onChange={ev => setSeo(ev.target.value)}
                        type="text"
                        placeholder="Introduzca informacion SEO" />
                    <input
                        value={href}
                        onChange={ev => setHref(ev.target.value)}
                        type="text"
                        placeholder="Introduzca vinculo de la imagen" />
                    <input
                        name="mediaManual"
                        onChange={ev => setMedia(ev.target.files[0])}
                        type="file"
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={createResource}
                    primary
                    content="ACEPTAR"
                />
            </Modal.Actions>
        </Modal>
    )
}

const EditGalleryItem = ({ render, update, step }) => {
    const [open, setOpen] = useState();
    const [seo, setSeo] = useState(step.title);
    const [href, setHref] = useState(step.link);

    const modalProps = {
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
        open: open,
        size: 'small',
        trigger: render
    };

    const submitForm = async () => {
        try {
            const save = await axios.put('/api/resources', {
                title: seo,
                link: href
            }, {
                params: {
                    id: step.idResource
                }
            });
            setSeo('');
            setHref('');
            setOpen(false);
            update(Math.random());
        } catch (err) {
            console.error('Error al guardar comentario:', err);
        }
    };

    return (
        <Modal {...modalProps}>
            <Modal.Header>
                Editar elemento de la galeria
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <input
                        value={seo}
                        onChange={ev => setSeo(ev.target.value)}
                        type="text"
                        placeholder="Introduzca informacion SEO" />
                    <input
                        value={href}
                        onChange={ev => setHref(ev.target.value)}
                        type="text"
                        placeholder="Introduzca vinculo de la imagen" />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button primary content='ACEPTAR' onClick={() => { submitForm() }} />
            </Modal.Actions>
        </Modal>
    )
}

const GalleryTable = ({ list = [], update }) => {

    const deleteItemGallery = async (id) => {
        try {
            const res = await axios.delete('/api/resources', {
                params: {
                    id: id
                }
            });
            update(Math.random());
        } catch (error) {
            console.log('Error al borrar Opinion')
        }
    };

    return (
        <Table>
            <Table.Header>
                <Table.HeaderCell>SEO</Table.HeaderCell>
                <Table.HeaderCell>ENLACE</Table.HeaderCell>
                <Table.HeaderCell>IMAGEN</Table.HeaderCell>
                <Table.HeaderCell>OPCIONES</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                {
                    list.map((media, index) => {
                        const { title, link } = media;
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{title}</Table.Cell>
                                <Table.Cell>{link}</Table.Cell>
                                <Table.Cell>
                                    {media.media && (
                                        <Image src={`${BASE_URL}${media.media}.png`} className="miniature-image" />
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Icon
                                        onClick={() => deleteItemGallery(media.idResource)}
                                        size="large"
                                        color="grey"
                                        className="custom-dropdown__icon"
                                        name='trash'
                                    />
                                    <EditGalleryItem
                                        step={media}
                                        render={<Icon size="large" color="grey" className="custom-dropdown__icon" name='pencil alternate' />}
                                        update={update}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}

export default Gallery;