import React, { useState, useEffect } from 'react';
import { Button, Grid, Header, Divider } from 'semantic-ui-react';

const Pedidos = () => {
    const [materialList, setMaterialList] = useState([]);

    const getMaterialList = () => {
        const handler = async () => {
            try {
                const { data } = await getMaterials();
                setMaterialList(data.result);
            } catch (e) {
                console.error('Error al obtener lista de materiales:', e)
            }
        };
        handler();
    };

    useEffect(() => {
        getMaterialList();
    }, []);

    return (
        <Grid columns="16" padded={true}>
            <Grid.Row>
                <Grid.Column width="8" style={{ paddingTop: '2rem' }}>
                    <Header>Administración de pedidos:</Header>
                </Grid.Column>
                <Grid.Column width="8" style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                   
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row >
               Tabla
            </Grid.Row>
        </Grid>
    );
};

export default Pedidos;