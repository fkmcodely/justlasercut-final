import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Menu, Image, Icon, Sidebar, Segment, Header, Dropdown } from 'semantic-ui-react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslation } from 'react-i18next'
import ModalSession from '../ModalSession';
import { useRouter } from 'next/router'
import Link from 'next/link'
import MenuMobile from '../MenuMobile';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';

const HeaderJustLaserCut = (props) => {
    const { data: session } = useSession();
    const { t, i18n } = useTranslation()
    const [mobileMenu, setMobileMenu] = useState(false);
    const [site, setSite] = useState();
    const router = useRouter()
    const [show, setShow] = useState(false);
    const { pathname, asPath, query, locale } = router

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

    const friendOptions = [
        {
            key: 'Spanish',
            text: 'Español',
            value: 'es',
            image: { avatar: true, src: `${BASE_URL}flag_es.jpg` },
        },
        {
            key: 'English',
            text: 'English',
            value: 'en',
            image: { avatar: true, src: `${BASE_URL}flag_en.png` },
        },
    ];

    return (
        <>
            <Container fluid className="header-just" id="header-just">
                <Container>
                    <Grid columns={16}>
                        <Grid.Row className="header-just__static">
                            <Grid.Column width="4" className="bussiness-contact">
                                <div className="header-identification-button margin-bottom-1">
                                    <Icon name="mail outline" size="large" />
                                    <p>{site?.email}</p>
                                </div>
                                <div className="header-identification-button">
                                    <Icon name="phone" size="large" />
                                    <p>{site?.phone}</p>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={9} tablet={6} computer={7} className="header-just__logo" onClick={() => router.push('/')}>
                                <img src='./JustLaseLogo.png' />
                            </Grid.Column>
                            <Grid.Column computer={5} tablet={10} className="header-just__user-experience-container">
                                <nav className="header-just__user-experience">
                                    <div className="header-identification-button margin-right-1">
                                        <Icon name="envelope outline" size="large" />
                                        <p>Contacto</p>
                                    </div>

                                    {session ? (
                                        <>
                                            <p>Bienvenido, {session.user.name}</p>
                                        </>
                                    ) : (
                                        <ModalSession />
                                    )}

                                    <div className="language-selector margin-right-1">
                                        <span>
                                            <Dropdown
                                                inline
                                                options={friendOptions}
                                                defaultValue={locale}
                                                onChange={(ev, e) => {
                                                    router.push({ pathname, query }, asPath, { locale: e.value })
                                                }}
                                            />
                                        </span>
                                    </div>
                                </nav>
                            </Grid.Column>
                            <Grid.Column mobile={7} className="header-just__menu-mobile">
                                <Icon name="th" onClick={() => {
                                    setShow(true)
                                }} size="big" color="black" />
                            </Grid.Column>
                        </Grid.Row>
                        <MenuJust />
                    </Grid>
                </Container>
            </Container>
            <MenuMobile show={show} setShow={setShow} />
        </>
    );
};


const MenuJust = () => {

    const navigation = [
        {
            title: "Tutoriales",
            href: "/manual"
        },
        {
            title: "Materiales",
            href: "/materiales"
        },
        {
            title: "Plantillas",
            href: "/plantillas"
        },
        {
            title: "Servicios",
            href: "/servicios"
        },
        {
            title: "Blog",
            href: "/blog"
        },
        {
            title: "tutoriales",
            href: "/user-profile"
        }
    ];
    return (
        <Grid.Row className="menu-just">
            <Grid.Column width="16" verticalAlign>
                <Menu pointing secondary className="menu-just__container">
                    {
                        navigation.map((page, index) => (
                            <Link href={page.href} key={index}>
                                {page.title}
                            </Link>
                        ))
                    }

                </Menu>
            </Grid.Column>
        </Grid.Row>
    )
}


export default HeaderJustLaserCut;