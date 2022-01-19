import React , { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Checkbox, Grid, Header, Icon, Input, Select } from "semantic-ui-react";

const ProjectCart = () => {
    //Obtener lista de proyectos subidos desde redux;
    const cart = useSelector(state => state.cart.items)

    return (
        <Grid columns={16}>
            <Grid.Row>
                <Grid.Column width={16}>
                    {
                        !cart?.length && (
                            <div>
                                <p className='empty-message'>
                                    No tienes ningun proyecto pendiente. Crea uno aquí.
                                </p>
                            </div>
                        )   
                    }
                    {
                        cart.map(item => <ProjectItem item={item} />)
                    }
                    
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};


const ProjectItem = ({ item }) => {
    // ESTADO: PLEGADO Y DESPLEGADO
    const [show,setShow] = useState(true);
    const { file } = item;

    const getDetectedCapas = () => {
        let auxCapas = [] 
        file.planchas.forEach((plancha,aux) => {
            plancha.capas.forEach((capa) => {
                auxCapas.push(capa.type)
            });
        })
        let result = auxCapas.filter((item,index) => {
            return auxCapas.indexOf(item) === index
        })
        return result
    }   
    
    console.log()
    
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
                                <Input 
                                    fluid 
                                    placeholder='Nombre del proyecto' 
                                    value={item.name ? item.name : 'Dale nombre a tu proyecto'} 
                                />
                            </Grid.Column>
                            <Grid.Column computer={8}>
                                <p>Copias: {item?.copias}</p>
                            </Grid.Column>
                        </Grid.Row>
                        {
                            !show && (
                                <Grid.Row>
                                    <Grid.Column computer={8}>
                                        <p>Material: "Seleccionar material"</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p>Cantidad de planchas: <span>{file.planchas.length}</span></p>
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
                                        <h5 className='title-dashed'>Errores detectados: </h5>
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
                                    <Grid.Column width={2} className='mini-drop'>
                                        <p>Sube tu archivo</p>
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
            {
                show && (
                    <>
                    <Grid.Row className='even-pad'>
                        <Grid.Column width={16}>
                            <Header >Datos de archivo</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4}>
                            <h5 className='title-dashed'>Número y Tamaño de planchas</h5>
                            <div>
                                <ul>
                                    {
                                        file?.planchas.map((plancha,index) => (
                                            <li>{`- Plancha (${index}) - ${plancha.board.width}X${plancha.board.height}mm`}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <h5 className='title-dashed'>Capas detectadas</h5>
                            <div>
                                <ul>
                                    {
                                        getDetectedCapas().map((capa) => (<li>{`- ${capa}`}</li>))
                                    }
                                    {/* <li> Corte exterior </li>
                                    <li> Corte interior </li>
                                    <li> Grabado de superficie </li>
                                    <li> Comentarios </li> */}
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={12}>
                            <h5 className='title-dashed'>Selección de material</h5>
                            <div className='select-material-options'>
                                <Select className='select-material-options__type'>
                                    <option>Tipo</option>
                                </Select>
                                <Select className='select-material-options__material'>
                                    <option>Material</option>
                                </Select>
                                <Select className='select-material-options__weight'>
                                    <option>Grosor</option>
                                </Select>
                            </div>
                            <div className='search-material-section'>
                                <Input placeholder='Busca Material'/>
                                <div>
                                    <p>Llevo mi propio material(contacta con justlasercut antes) <Checkbox /></p>
                                </div>
                            </div>
                            <h5 className='title-dashed'>Extras:</h5>
                            <div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                    
                                </div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                </div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                </div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    </>
                )
            }
        </Grid>
    )
};

export default ProjectCart;