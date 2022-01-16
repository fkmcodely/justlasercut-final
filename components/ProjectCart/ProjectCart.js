import React from 'react';
import { Button, Grid, Icon } from "semantic-ui-react";

const ProjectCart = () => {
    //Obtener lista de proyectos subidos desde redux;
    const projectList = [];

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
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default ProjectCart;