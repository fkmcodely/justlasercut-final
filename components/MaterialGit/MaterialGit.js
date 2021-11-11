
import React from 'react';
import { Grid , Container, Button } from 'semantic-ui-react';
import Filters from '../Filters/Filters';
import Material from "../Material";


const MaterialGit = () => {
    return (
        <Container fluid className="material-git">
            <Grid columns="16" padded>
                <Grid.Row>
                    <Grid.Column width="3">
                        <Filters/>
                    </Grid.Column>
                    <Grid.Column width="13">
                        <Grid columns="16" className="material-git__list" padded relaxed>
                            <HelpCard />
                            <Material 
                                image="https://lorempixel.com/g/300/201/" 
                                name="Tablero de DM. 5mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/202/" 
                                name="Tablero de DM. 5mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/203/" 
                                name="Tablero de DM. 3mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/204/" 
                                name="Tablero de DM. 3mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/201/" 
                                name="Tablero de DM. 5mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/202/" 
                                name="Tablero de DM. 5mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/203/" 
                                name="Tablero de DM. 3mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/204/" 
                                name="Tablero de DM. 3mm" 
                            />
                            <Material 
                                image="https://lorempixel.com/g/300/204/" 
                                name="Tablero de DM. 3mm" 
                            />
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

const HelpCard = () => {
    return(
        <Grid.Column width="3" className="help-card">
            <Grid columns="16">
                <Grid.Row>
                    <Grid.Column width="16" className="help-card__bg">
                        <p style={{maxHeight: '80px',overflow: 'hidden'}}>
                            Usa los filtros para encontrar el material que necesites y 
                            elige el tamaño de plancha y grosor que necesites. 
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width="16" textAlign="right">
                        <Button className="help-card__button">Contacto</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    )
}

export default MaterialGit;