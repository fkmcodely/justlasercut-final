import React , { useState } from 'react';
import { Button, Grid, Header, Icon, Input } from "semantic-ui-react";

const ProjectCart = () => {
    //Obtener lista de proyectos subidos desde redux;
    const projectList = [1];

    return (
        <Grid columns={16}>
            <Grid.Row>
                <Grid.Column width={16}>
                    {
                        !projectList.length && (
                            <div>
                                <p className='empty-message'>
                                    No tienes ningun proyecto pendiente. Crea uno aquí.
                                </p>
                            </div>
                        )   
                    }
                    <ProjectItem />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};


const ProjectItem = () => {
    // ESTADO: PLEGADO Y DESPLEGADO
    const [show,setShow] = useState(true);
    return(
        <Grid columns={16} className='project-view'>
            <Grid.Row>
                <Grid.Column width={4}>
                    <div className='project-view__svg'>
                        <p>Previsualización.</p>
                    </div>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Grid columns={16}>
                        <Grid.Row>
                            <Grid.Column computer={8}>
                                <Input fluid placeholder='Nombre del proyecto' value='Nombre del proyecto' />
                            </Grid.Column>
                            <Grid.Column computer={8}>
                                <p>Copias: 1</p>
                            </Grid.Column>
                        </Grid.Row>
                        {
                            !show && (
                                <Grid.Row>
                                    <Grid.Column computer={8}>
                                        <p>Material: "Seleccionar material"</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p>Cantidad de planchas: "Numero total de planchas"</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p>Errores en archivo : "Lista"</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p>Extras seleccionados:</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p>Calidad de grabado relleno: 0.1/1.5/0.2</p>
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        }
                        {
                            show && (
                                <Grid.Row>
                                    <Grid.Column width={14}>
                                        <h5>Errores detectados: </h5>
                                        <section style={{ display: 'flex'}}>
                                            <div style={{ width: '48%'}}>
                                                <p>Sombreados</p>
                                                <p>Bloques</p>
                                                <p>Puntos</p>
                                            </div>
                                            <div style={{ width: '48%'}}>
                                                <p>Texto</p>
                                                <p>Grabado relleno cerrado</p>
                                                <p>Objetos fuera de capas</p>
                                            </div>
                                        </section>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                            <span>Vuelve a subir o arrastra tu archivo aquí</span>
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        }
                    </Grid>          
                </Grid.Column>
                <Grid.Column verticalAlign='center' computer={1}>
                    <Icon onClick={() => setShow(!show)} size="large" className="" name='plus' />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Header>Datos de archivo</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column computer={4}>
                    <h5>Número y Tamaño de planchas</h5>
                    <div>
                        <ul>
                            <li>- Plancha1 600x900mm</li>
                            <li>- Plancha1 600x900mm</li>
                            <li>- Plancha1 600x900mm</li>
                        </ul>
                    </div>
                    <h5>Capas detectadas</h5>
                    <div>
                        <ul>
                            <li> Corte exterior </li>
                            <li> Corte interior </li>
                            <li> Grabado de superficie </li>
                            <li> Comentarios </li>
                        </ul>
                    </div>
                </Grid.Column>
                <Grid.Column computer={12}>
                    <h5>Selección de material</h5>
                    <div>
                        <select>
                            <option>Tipo</option>
                        </select>
                        <select>
                            <option>Material</option>
                        </select>
                        <select>
                            <option>Grosor</option>
                        </select>
                    </div>
                    <div>
                        <Input placeholder='Busca Material'/>
                    </div>
                    <h5>Extras:</h5>
                    <div>
                        <div style={{ display: 'flex' , alignItems: 'center'}}>
                            <p>
                                - Lamina antiguemaduras por una cara 3$/plancha
                            </p>
                            <input type='checkbox' />
                        </div>
                        <div style={{ display: 'flex' , alignItems: 'center'}}>
                            <p>
                                - Lamina antiguemaduras por una cara 3$/plancha
                            </p>
                            <input type='checkbox' />
                        </div>
                        <div style={{ display: 'flex' , alignItems: 'center'}}>
                            <p>
                                - Lamina antiguemaduras por una cara 3$/plancha
                            </p>
                            <input type='checkbox' />
                        </div>
                        <div style={{ display: 'flex' , alignItems: 'center'}}>
                            <p>
                                - Lamina antiguemaduras por una cara 3$/plancha
                            </p>
                            <input type='checkbox' />
                        </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default ProjectCart;