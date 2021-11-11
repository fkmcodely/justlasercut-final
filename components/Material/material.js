import React from 'react';
import { Grid, Image } from "semantic-ui-react"

const Material = ({ name , image, id}) => {
    return (
        <Grid.Column width="3" className="material">
            <Grid columns="16">
                <Grid.Row className="material__title">
                    <Grid.Column width="14">
                        {name}
                    </Grid.Column>
                    <Grid.Column width="14">

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="material__image">
                    <Grid.Column width="16">
                        <Image src={image} alt={name} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    );
};

export default Material;