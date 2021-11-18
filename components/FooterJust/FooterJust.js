import React, { useEffect, useState } from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useRouter } from 'next/router';

const languages = {
    en: require('../../locale/en/commons.json'),
    es: require('../../locale/es/commons.json')
};

const FooterJust = () => {
    const [site, setSite] = useState();
    const { locale } = useRouter();
    const t = languages[locale];

    useEffect(() => {
        const getSiteInfo = async () => {
            try {
                const request = await axios('/api/site');
                setSite(request.data.configurationSite[0]);
            } catch (err) {
                console.error(err)
            }
        };
        getSiteInfo();
    }, []);

    return (
        <Container fluid className="footer-just" id="footer-just">
            <Container>
                <Grid columns="16">
                    <Grid.Row>
                        <Grid.Column computer="6">
                            <p>{site?.sitename}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.direccion}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.ciudad}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.codigopostal}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.españa}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.derechos}</p>
                        </Grid.Column>
                        <Grid.Column width="6">
                            <p style={{ textDecoration: 'underline' }}>(+34) {site?.phone}</p>
                            <p style={{ marginBottom: '2rem', textDecoration: 'underline' }}>{site?.email}</p>
                            <p>{t.newsletter}</p>
                            <p>Tu email:__________________</p>
                            <p>{t.privacidad}</p>
                        </Grid.Column>
                        <Grid.Column width="4">
                            <Icon name="instagram" size="big" color="white />" />
                            <Icon name="facebook" size="big" color="white />" />
                            <Icon name="twitter" size="big" color="white />" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};

export default FooterJust;