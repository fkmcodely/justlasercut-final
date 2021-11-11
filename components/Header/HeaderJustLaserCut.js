import React from 'react';
import { Container, Grid, Menu } from 'semantic-ui-react';
import { useSession, signIn, signOut } from "next-auth/react";
import ModalSession from '../ModalSession';

const HeaderJustLaserCut = () => {
    const { data: session } = useSession();
    console.log(session)
    return (
        <Container fluid className="header-just" id="header-just">
            <Container>
                <Grid columns={16}>
                    <Grid.Row className="header-just__static">
                        <Grid.Column width="6" className="bussiness-contact">
                            <div>
                                <p>info@archicercle.com</p>
                                <p>(+34) 649 999 853</p>
                            </div>
                        </Grid.Column>
                        <Grid.Column mobile={10} computer={6} className="header-just__logo">
                            <img src='./JustLaseLogo.png' />
                        </Grid.Column>
                        <Grid.Column width={5} className="header-just__user-experience-container">
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
                    </Grid.Row>
                    <MenuJust />        
                </Grid>
            </Container>
        </Container>
    );
};


const MenuJust = () => {

    const NavigationOptions = ["Tutoriales","Materiales","Plantillas","Servicios","Blog","Tus Proyectos"];
    
    return (
        <Grid.Row className="menu-just">
                <Grid.Column width="16">
                    <Menu pointing secondary className="menu-just__container">
                        {
                            NavigationOptions.map((page,index) => (
                                <Menu.Item key={index} active={index === 0 ? true : false}>
                                    {page}
                                </Menu.Item>        
                            ))
                        }
                        
                    </Menu>
                </Grid.Column>
        </Grid.Row>
    )
}

export default HeaderJustLaserCut;