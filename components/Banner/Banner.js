import React, { useState, useRef } from 'react';
import { Container, Grid, Image } from "semantic-ui-react";
import { BASE_URL } from '../../constants/config';
import axios from "axios";
const { v4: uuidv4 } = require('uuid');

const Banner = () => {
    const [files, setFiles] = useState({});
    const fileInputField = useRef(null)

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
                    console.log(handleCreateItemProject.data);
                }
            } catch (error) {
                console.error(`Error al subir fichero al servidor`, error);
            }


        };
        startProject();

    }

    return (
        <Container fluid className="banner">
            <Container className="banner__container">
                <Grid columns="16" className="banner__grid">
                    <Grid.Column computer="8" tablet={8} mobile={16} className="banner__manual">
                        <p>
                            JustLasercut es una platafora que hace realidad tus ideas.
                            Tanto si controlas programas de diseño como si simplemente tienes una idea que quieres realizar,
                            estamos aquí para hacerla realidad.
                            <ul>
                                <li>- Lee el <a href="/manual">manual</a> de preparación de archivos.</li>
                                <li>- Consulta nuestra gama de materiales.</li>
                                <li>- Descarga nuestra plantilla de trabajo, en AutoCAD o en Illustrator. </li>
                                <li>-Si aun tienes dudas, o necesitas ayuda con tu diseño, contáctanos.</li>
                            </ul>
                        </p>
                    </Grid.Column>
                    <Grid.Column computer="8" tablet={8} mobile={16} className="banner__start-shop">
                        <div className="upload-box">
                            <div class="inputfile-box">
                                <input onChange={(ev) => { updateItemProject(ev) }} type="file" id="file" ref={fileInputField} o />
                                <label for="file">
                                    <span id="file-name" class="file-box"></span>
                                    <span class="file-button">
                                        <i class="fa fa-upload" aria-hidden="true"></i>
                                        <p>
                                            Si ya tienes lo archivos, puedes subir archivos desde la página de materiales o directamente aquí.
                                        </p>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        </Container>
    );
};

export default Banner;