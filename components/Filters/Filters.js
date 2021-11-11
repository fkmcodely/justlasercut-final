import React from 'react';
import { Grid , Header, Input } from 'semantic-ui-react';

const Filters = () => {
    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <MaterialCategory />              
                </Grid.Column>
                <Grid.Column width="16">
                    <PlateSize />
                </Grid.Column>
                <Grid.Column width="16">
                    <PlateWeight />
                </Grid.Column>
                <Grid.Column width="16">
                    <Finishing />
                </Grid.Column>
                <Grid.Column width="16">

                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const MaterialCategory = () => {
    const listMaterials = ["Maderas","Plasticos","Textiles","Papel y Carton","Cauchos","Espumas"];
    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Material</Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <ul>
                        { listMaterials.map((material,index) => (
                            <li>
                                <input type="checkbox" value={true} />
                                {material}
                            </li>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const PlateSize = () => {
    const listMaterials = ["Pequeño (Hasta 600x600mm)","Mediano(Hasta 1200x900mm)","Gran formato"];
    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Tamaño de la plancha:</Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <ul>
                        { listMaterials.map((material,index) => (
                            <li>
                                <input type="checkbox" value={true} />
                                {material}
                            </li>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const PlateWeight = () => {
    
    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Grosor de plancha:</Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <Input type="range" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const Finishing = ({  }) => {
    const listMaterials = ["Acabados","Transparente","Translúcido"];
    
    return(
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Acabados:</Header>
                </Grid.Column>
                <Grid.Column width="16">
                     <ul>
                        { listMaterials.map((material,index) => (
                            <li>
                                <input type="checkbox" value={true} />
                                {material}
                            </li>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Filters;