import React from 'react';
import { Container, Grid, Header, Image, Button, Divider } from 'semantic-ui-react';
import { BASE_URL } from "../../constants/config";

const Services = ({ list }) => {

    console.log(list);

    return (
        <Container fluid className="service">
            <Container>
                <Grid columns="16">
                    <Grid.Row>
                        <Grid.Column width="16" className="service__title">
                            <Header as="h2">Inspiraciones - Recursos</Header>
                            <Divider />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {
                            list.map((service, key) => (
                                <Grid.Column key={key} computer={4} mobile={8} tablet={4} className="service__item">
                                    <Image
                                        alt={service.title}
                                        href={service.link}
                                        src={`${BASE_URL}public/${service.media}.png`} />
                                </Grid.Column>
                            ))
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <Button primary className="button-main" color="red" primary>INSTAGRAM</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};

export default Services;