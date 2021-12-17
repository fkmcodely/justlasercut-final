import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import CreationCategoryModal from './CreationCategoryModal';
import CreationMaterialModal from "./CreationMaterialModal";

const Material = () => {
    return (
        <Grid columns="16" padded={true}>
            <Grid.Row>
                <Grid.Column width="8">
                    <Header>Administración de materiales</Header>
                </Grid.Column>
                <Grid.Column width="8">
                    <CreationMaterialModal />
                    <CreationCategoryModal />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Material;