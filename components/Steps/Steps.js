import React from 'react';
import { Container, Grid , Header, Image } from 'semantic-ui-react';

const Steps = () => {

    const steps = [
        "1. Consulta nuestros materiales y elige los que necesites.",
        "2. Descarga nuestra plantilla de trabajo y prepara tus archivos.",
        "3. Sube tus archivos y obtén un presupuesto inmediato.",
        "4. Tras revisar tus archivos, te mandaremos un link de compra.",
        "5. Te lo mandamos a casa en 48h."
    ]
    
    return (
        <Container fluid className="steps-just">
            <Container>
                <Grid columns="16">
                    <Grid.Row>
                        <Header as="h2">Cómo funciona</Header>
                    </Grid.Row>
                    <Grid.Row className="step-just__container-items">
                        { steps.map((step,key) => <Step key={key} description={step} />)}
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};


const Step = ({description}) => {

    return(
        <Grid.Column width={3} className="step-just">
            <Image src="./Rectangle.png" />
            <p>{description}</p>
        </Grid.Column>
    )
}
export default Steps;