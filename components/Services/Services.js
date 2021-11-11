import React from 'react';
import { Container, Grid, Header, Image, Button } from 'semantic-ui-react';
import { BASE_URL } from "../../constants/config";

const Services = () => {

    const services = [
        "branding",
        "graphic",
        "menuqr",
        "metacrilato",
        "printer",
        "productos",
        "renders",
        "rotulos"
    ]
    
    return (
        <Container fluid className="service">
            <Container>
                <Grid columns="16">
                    <Grid.Row>
                        <Grid.Column width="16" className="service__title">
                            <Header as="h2">Inspiraciones - Recursos</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {
                            services.map((service,key) => (
                                <Grid.Column key={key} width="4" className="service__item">
                                    <Image src={`${BASE_URL}/${service}.png`} />
                                </Grid.Column>
                            ))
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <Button inverted color="red" primary>INSTAGRAM</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};

export default Services;