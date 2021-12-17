import React, { useState } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { createMaterial } from "../../../services/material";
import axios from "axios";
const { v4: uuidv4 } = require('uuid');

const CreationMaterialModal = () => {
    const [open, setOpen] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [plateSizes, setPlateSizes] = useState([]);

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [filename, setFilename] = useState();
    const [media, setMedia] = useState();

    const onSubmit = data => {
        try {
            const handler = async () => {
                const id = uuidv4();
                const extension = filename.split('.').pop();
                const post = await createMaterial({ ...data, plateSizes, id: id, image: `${id}.${extension}` });
                if (media) {
                    const data = new FormData();
                    data.append('file', media);
                    await axios.post('/api/multimedia', data, {
                        params: {
                            id: id
                        }
                    });
                }
                console.log(post);
            };
            handler();
            setOpen(false)
        } catch (err) {
            console.log('Error.', err);
            setOpen(false)
        }
        console.log(data);
    };

    const handlerPlateSizes = (typeOperation, id = null) => {
        if (typeOperation === true) {
            setPlateSizes([...plateSizes, { id: uuidv4(), width: width, height: height }]);
            reset();
            return;
        }
        setPlateSizes(plateSizes.filter(plate => plate.id !== id));
        reset();
    };
    const reset = () => {
        setWidth();
        setHeight();
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>+</Button>}
        >
            <Modal.Header></Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description>
                    <Header>Formulario de creación de material</Header>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div>
                                <label>Nombre (ES)</label>
                                <input {...register("title.es", { required: true })} type="text" />
                                {errors?.title?.es && <span>El campo es obligatorio</span>}
                            </div>
                            <div>
                                <label>Nombre (EN)</label>
                                <input {...register("title.en", { required: true })} type="text" />
                                {errors?.title?.en && <span>El campo es obligatorio</span>}
                            </div>
                            <input
                                name="mediaManual"
                                onChange={ev => {
                                    setFilename(ev.target.files[0].name)
                                    setMedia(ev.target.files[0])
                                }
                                }
                                type="file"
                            />
                            <select {...register("materialCategory", { required: true })}>
                                <option value="value2" selected>Carton</option>
                            </select>
                            <select {...register("surfacePainting", { required: true })}>
                                <option value="value2" selected>1</option>
                                <option value="value2" selected>2</option>
                                <option value="value2" selected>Ninguno</option>
                            </select>
                            <div>
                                <div>
                                    <input type="number" placeholder="Ancho" value={width} onChange={(ev) => setWidth(ev.target.value)} />
                                    <input type="number" placeholder="Alto" value={height} onChange={(ev) => setHeight(ev.target.value)} />
                                    <Button content='+' primary onClick={() => handlerPlateSizes(true)} />
                                </div>
                                <div>
                                    Lista
                                    {
                                        plateSizes.map(({ width, height, id }) => (
                                            <div>
                                                <p>{width}X{height}</p>
                                                <Button color='red' content="-" onClick={() => handlerPlateSizes(false, id)} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <label>
                                    Precio por minuto maquina grande:
                                    <input type="number" {...register("prices.priceMinuteLargeMachine")} />
                                </label>
                                <label>
                                    Precio por minuto maquina pequeña:
                                    <input type="number" {...register("prices.priceMinuteSmallMachine")} />
                                </label>
                                <label>
                                    Precio minimo maquina grande:
                                    <input type="number" {...register("prices.largeMinimumPrice")} />
                                </label>
                                <label>
                                    Precio minimo maquina pequeña:
                                    <input type="number" {...register("prices.smallMinimumPrice")} />
                                </label>
                                <label>
                                    Precio m2 revestimiento
                                    <input type="number" {...register("prices.priceM2backing")} />
                                </label>
                                <label>
                                    Precio m2 de pintura:
                                    <input type="number" {...register("prices.priceM2painting")} />
                                </label>
                                <label>
                                    Precio minimo por pintura:
                                    <input type="number" {...register("prices.minimumPricePaint")} />
                                </label>
                            </div>
                            <input type="submit" />
                        </div>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default CreationMaterialModal;