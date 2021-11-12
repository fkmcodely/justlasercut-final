import React , { useEffect, useState } from 'react';
import { Button, Container, Grid, Menu, Icon, Sidebar, Segment, Header } from 'semantic-ui-react';
import { useSession, signIn, signOut } from "next-auth/react";
import ModalSession from '../ModalSession';
import { useRouter } from 'next/router'
import Link from 'next/link'
import MenuMobile from '../MenuMobile';
import axios from 'axios';

const HeaderJustLaserCut = (props) => {
    const { data: session } = useSession();
    const [mobileMenu,setMobileMenu] = useState(false);
    const [site,setSite] = useState();
    const router = useRouter()
    const [show,setShow] = useState(false);

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
    },[]);
    
    return (
        <>
        <Container fluid className="header-just" id="header-just">
            <Container>
                <Grid columns={16}>
                    <Grid.Row className="header-just__static">
                        <Grid.Column width="3" className="bussiness-contact">
                            <div>
                                <p>{site?.email}</p>
                                <p>{site?.phone}</p>
                            </div>
                        </Grid.Column>
                        <Grid.Column mobile={9} tablet={6} computer={9} className="header-just__logo" onClick={() => router.push('/')}>
                            <img src='./JustLaseLogo.png' />
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={10} className="header-just__user-experience-container">
                            <nav className="header-just__user-experience">
                                <p>Contacto</p>
                                { session ? (
                                    <>
                                        <p>Bienvenido, {session.user.name}</p>
                                    </>
                                ):(
                                    <ModalSession />
                                )}
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
                                navigation.map((page,index) => (
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