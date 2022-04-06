import React, { useEffect, useState } from 'react';
import { Container, Grid, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BASE_URL } from "../../constants/config";

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
                        <Grid.Column computer="6" tablet={8} mobile={16}>
                            <Image src={`${BASE_URL}/JustLaseLogo.png`} alt="flag_spain" />
                            <p style={{ marginBottom: '2px' }}>{t?.direccion}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.ciudad}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.codigopostal}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.españa}</p>
                            <p style={{ marginBottom: '2px' }}>{t?.derechos}</p>
                        </Grid.Column>
                        <Grid.Column computer="6" tablet={8} mobile={16}>
                            <p style={{ textDecoration: 'underline' }}>(+34) {site?.phone}</p>
                            <p style={{ marginBottom: '2rem', textDecoration: 'underline' }}>{site?.email}</p>
                        </Grid.Column>
                        <Grid.Column computer={4} mobile={16} tablet={16}>
                            <Icon name="instagram" size="big" />
                            <Icon name="facebook" size="big" />
                            <Icon name="twitter" size="big" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};

export default FooterJust;