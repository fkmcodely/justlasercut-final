import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { Button, Header, Image, Modal, Divider } from 'semantic-ui-react'
import axios from "axios";
import { changeName } from "../../redux/reducers/cartSlice";
const { v4: uuidv4 } = require('uuid');

const ModalMaterial = ({ material }) => {
    const { weightList, plateSizes } = material;
    const [fileDataCharged, setFileDataCharged] = useState();
    const { title, image } = material;
    const [open, setOpen] = React.useState(false);
    const [files, setFiles] = useState({});
    const { register, handleSubmit } = useForm();
    const fileInputField = useRef(null);
    const dispatch = useDispatch();
    const [weightItem, setWeight] = useState();

    const addProjectToCart = () => {
        const item = {
            materialName: material.title,
            materialId: material.id,
            weight: weightItem,
            extras: [],
            file: fileDataCharged
        }
        dispatch(changeName(item));
    };

    const updateItemProject = (ev) => {
        setFiles([0]);
        const startProject = async () => {
            try {
                if (files) {
                    const data = new FormData();
                    data.append('file', ev.target.files[0]);
                    const uploadMedia = await axios.post(`/api/dfx`, data, {
                        params: {
                            id: uuidv4(),
                        }
                    });
                    const fileName = uploadMedia.data.message;
                    const handleCreateItemProject = await axios.post('/api/project', {
                        fileName: fileName
                    });
                    setFileDataCharged({ ...handleCreateItemProject.data })
                }
            } catch (error) {
                console.error(`Error al subir fichero al servidor`, error);
            }
        };
        startProject();

    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Image src='/+.png' alt='' style={{ width: '1rem', height: '1rem' }} />}
        >
            <Modal.Header>{title.es}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={`/${image}`} wrapped style={{ width: '40%' }} />
                <div style={{ width: '60%', padding: '1.5rem' }}>
                    <h5>1.Elige tu material</h5>
                    <Divider />
                    <div>
                        <p><b>Grosor</b></p>
                        {
                            weightList.map(({ weight }) => (
                                <>
                                    <p className="mb-0">
                                        <input
                                            className="mr-5"
                                            type="radio"
                                            value={weight}
                                            onChange={() => setWeight(weight)}
                                            name="weight" />{weight}mm
                                    </p>
                                </>
                            ))
                        }
                    </div>
                    <h5><b>2. Consulta los tamaños de plancha para preparar tu archivo</b></h5>
                    <Divider />
                    <div>
                        <p>Tamños de plancha disponibles:</p>
                        {
                            plateSizes.map(({ width, height }) => <p className="mb-0">
                                - {width}x{height}mm
                            </p>)
                        }
                    </div>
                    <h5><b>3. Añade los extras que necesites en este archivo.</b></h5>
                    <Divider />
                    <div>
                        <label className="row-item">
                            <div>
                                <input type="checkbox" />
                                Pintura spray pre cortado en una cara
                            </div>
                            <p>3$/plancha</p>
                        </label>
                        <label className="row-item">
                            <div>
                                <input type="checkbox" />
                                Pintura spray pre cortado en ambas caras
                            </div>
                            <p>3$/plancha</p>
                        </label>
                        <label className="row-item">
                            <div>
                                <input type="checkbox" />
                                Lamina antiquemaduras en una cara
                            </div>
                            <p>3$/plancha</p>
                        </label>
                        <label className="row-item">
                            <div>
                                <input type="checkbox" />
                                Lámina antiquemaduras en ambas caras
                            </div>
                            <p>3$/plancha</p>
                        </label>
                        <label className="row-item">
                            <div>
                                <input type="checkbox" />
                                Lámina adhesiva  en una cara.
                            </div>
                            <p>3$/plancha</p>
                        </label>
                    </div>
                    <h5>4. Sube tu archivo aquí para calcular tu presupuesto.</h5>
                    <div className="box-upload">
                        <input onChange={(ev) => { updateItemProject(ev) }} type="file" id="file" ref={fileInputField} />
                    </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
                <Button
                    content="Añadir"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => {
                        addProjectToCart();
                        setOpen(false)
                    }}
                    style={{ backgroundColor: '#CC555F', color: 'white' }}
                />
            </Modal.Actions>
        </Modal>
    )
};

export default ModalMaterial;