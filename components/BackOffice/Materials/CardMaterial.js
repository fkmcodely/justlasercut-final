import React from 'react';
import { Grid, Button, Image, Divider } from "semantic-ui-react";
import { deleteMaterial } from "../../../services/material";

const CardMaterial = ({ material }) => {
    const { title, image, materialCategory, id } = material;

    return (
        <Grid columns="16" key={id} style={{ border: '1px solid gray' }}>
            <Grid.Row>
                <Grid.Column width="8" style={{ display: 'flex' }}>
                    <Button size="mini" color='red' onClick={async () => {
                        const res = await deleteMaterial(id);
                    }}>Eliminar</Button>
                    <Button size="mini" color='instagram'>Editar</Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: '0px' }}>
                <Grid.Column width="16">
                    <Image style={{ height: '7rem', width: '100%' }} bordered src={`/${image}`} />
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row style={{ padding: '0px' }}>
                <Grid.Column width="16" >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p><b>{title?.es}</b></p>
                        <span>{materialCategory}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>precio</p>
                        <p>Stock</p>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default CardMaterial;