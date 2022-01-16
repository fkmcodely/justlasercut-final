import React , { useState , useEffect, useRef } from 'react';
import { Container, Grid, Header, Button, Icon, Form, Input } from "semantic-ui-react";
import ProjectCart from '../components/ProjectCart/ProjectCart';
import { useRouter } from 'next/router';

const languages = {
    'es': require('../locale/es/commons.json'),
    'en': require('../locale/en/commons.json'),
};

const proyectos = () => {
    const [isUploadView,setUploadView] = useState(true);

    return (
        <Container className='proyectos'>
            { !isUploadView && (<MainApp setUploadView={setUploadView} />) }
            { isUploadView && (<UploadProject setUploadView={setUploadView} />)}
        </Container>
    );
};


const UploadProject = ({ setUploadView }) => {
    const fileInputField = useRef(null)
    const [files, setFiles] = useState({});
    const { locale } = useRouter();
    const t = languages[locale];

    const updateItemProject = (ev) => {

    };
    
    return (
        <Grid columns={16} className='upload-project'>
            <Grid.Row>
                <Grid.Column computer={16}>
                    <p className='name'>
                        <b>Nombre de tu proyecto: </b>
                        <Input type='text' />
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
               <Grid.Column computer={16}>
                <Header as="h3">
                    Tu presupuesto
                </Header>
               </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column computer={16}>
                    <div className="upload-box">
                        <div className="inputfile-box">
                            <input onChange={(ev) => { updateItemProject(ev) }} type="file" id="file" ref={fileInputField} />
                            <label htmlFor="file">
                                <span id="file-name" className="file-box"></span>
                                <span className="file-button">
                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                    <p>{t.subirdxf}</p>
                                </span>
                            </label>
                        </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button positive>Continuar</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const MainApp = ({setUploadView}) => {
    return (
        <Grid columns={16}>
            <Grid.Row>
                <Grid.Column computer={16}>
                    <Header as='h1'>Tu proyecto actual:</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column computer={16} className='project-cart'>
                    <ProjectCart />
                    <hr/>
                    <Button positive onClick={() => setUploadView(true)}>
                        <Icon corner size='large' name='plus' />
                        CREAR
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default proyectos;