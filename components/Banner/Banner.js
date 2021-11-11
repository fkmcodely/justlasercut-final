import React from 'react';
import { Container, Grid, Image } from "semantic-ui-react";

const Banner = () => {
    return (
        <Container fluid className="banner">
            <Container className="banner__container">
                <Grid columns="16" className="banner__grid">
                    <Grid.Column computer="8" mobile={16} className="banner__manual">
                        <p>
                            JustLasercut es una platafora que hace realidad tus ideas. 
                            Tanto si controlas programas de diseño como si simplemente tienes una idea que quieres realizar, 
                            estamos aquí para hacerla realidad. 
                            <ul>
                                <li>- Lee el <a href="/manual">manual</a> de preparación de archivos.</li>
                                <li>- Consulta nuestra gama de materiales.</li>
                                <li>- Descarga nuestra plantilla de trabajo, en AutoCAD o en Illustrator. </li>
                                <li>-Si aun tienes dudas, o necesitas ayuda con tu diseño, contáctanos.</li>
                            </ul>
                        </p>
                    </Grid.Column>
                    <Grid.Column computer="8" mobile={16} className="banner__start-shop">
                        <div>
                            <p>
                                Si ya tienes lo archivos, puedes subir archivos desde la página de materiales o directamente aquí.
                            </p>
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        </Container>
    );
};

export default Banner;