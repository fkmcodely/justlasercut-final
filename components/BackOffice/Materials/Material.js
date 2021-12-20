import React, { useState, useEffect } from 'react';
import { Button, Grid, Header, Divider } from 'semantic-ui-react';
import CreationCategoryModal from './CreationCategoryModal';
import CreationMaterialModal from "./CreationMaterialModal";
import CreationSubtitleModal from "./CreationSubCategoryModa";
import { getMaterials } from "../../../services/material";
import CardMaterial from "./CardMaterial";

const Material = () => {
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
                    <Header>Administración de materiales</Header>
                </Grid.Column>
                <Grid.Column width="8" style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <CreationMaterialModal />
                    <CreationCategoryModal />
                    <CreationSubtitleModal />
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row >
                {
                    materialList.map((material) => (
                        <Grid.Column width="3" style={{ marginBottom: '2.5rem' }}>
                            <CardMaterial material={material} />
                        </Grid.Column>
                    ))
                }
            </Grid.Row>
        </Grid>
    );
};

export default Material;