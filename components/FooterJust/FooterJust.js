import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const FooterJust = () => {
    return (
       <Container fluid className="footer-just" id="footer-just">
           <Container>
               <Grid columns="16">
                   <Grid.Row>
                       <Grid.Column width="5">
                           <p>JustLasercut by Archicercle:</p>
                           <p>Calle Utiel 6 bajo derecha</p>
                           <p>Valencia</p>
                           <p>46020</p>
                           <p>ESPAÑA</p>
                           <p>Todos los derechos reservados</p>
                       </Grid.Column>
                       <Grid.Column width="6">
                            <p>(+34) 649 999 853:</p>
                            <p>info@justlasercut.com</p>
                            <p>Suscribete a nuestra newsletter</p>
                            <p>Tu email:__________________</p>
                            <p>He leido y acepto la politica de privacidad</p>
                       </Grid.Column>
                       <Grid.Column width="5">
                            <p>Instagram</p>
                            <p>TikTok</p>
                            <p>Facebook</p>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
           </Container>
       </Container>
    );
};

export default FooterJust;