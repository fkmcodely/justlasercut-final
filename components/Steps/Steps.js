import React from 'react';
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react';

const Steps = ({ steps = [] }) => {

    const stepsOld = [
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
                    <Grid.Row className="steps-just__header">
                        <Header as="h2">Cómo funciona</Header>
                        <Divider />
                    </Grid.Row>
                    <Grid.Row className="step-just__container-items">
                        {steps.map((step, key) => <Step key={key} step={step} />)}
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};


const Step = (step) => {
    const { description, title, source } = step.step;
    console.log(step)
    return (
        <Grid.Column computer={3} tablet={5} mobile={8} className="step-just">
            <Image src="./Rectangle.png" />
            <Header as="h4">{title}</Header>
            {description && (<p>{description}</p>)}
        </Grid.Column>
    )
}
export default Steps;