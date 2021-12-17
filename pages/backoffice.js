import React, { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { BACKOFFICE_OPTIONS } from "../constants/backofficeMenu";
import Contact from '../components/BackOffice/Contact/Contact';
import Users from '../components/BackOffice/Users';
import Configuration from '../components/BackOffice/Configuration/Configuration';
import Material from '../components/BackOffice/Materials/';

const backoffice = () => {
    const [menuSelected, setMenuSelected] = useState(5)
    useEffect(() => {
        document.getElementById('header-just').style.display = 'none';
        document.getElementById('footer-just').style.display = 'none';
    }, []);

    return (
        <>
            <HeaderOffice />
            <Container fluid className="backoffice">
                <Grid columns="16" className="backoffice__grid">
                    <Grid.Row className="backoffice__row">
                        <Grid.Column width="3" className="backoffice__menu">
                            <MenuBackOffice setMenuSelected={setMenuSelected} />
                        </Grid.Column>
                        <Grid.Column width="13">
                            {menuSelected === 3 && (<Material />)}
                            {menuSelected === 5 && (<Users />)}
                            {menuSelected === 6 && (<Contact />)}
                            {menuSelected === 7 && (<Configuration />)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    );
};


// MENU DEL BACKOFFICE 
const MenuBackOffice = ({ setMenuSelected = () => { } }) => {
    return (
        <Grid columns="16" stackable className="menu-backoffice">
            {BACKOFFICE_OPTIONS.map((menu, index) => (
                <Grid.Column onClick={() => setMenuSelected(menu.index)} width="16" key={index} className="menu-backoffice__item">
                    <div>
                        {menu.name}
                    </div>
                </Grid.Column>
            ))}
        </Grid>
    )
};

// CABECERA DEL BACKOFFICE
const HeaderOffice = () => {
    return (
        <Container fluid className="header-backoffice">
            <Grid columns="16" className="header-backoffice__row">
                <Grid.Row >
                    <Grid.Column width="5">
                        <img className="header-backoffice__logo" src='./justlaserlogobackoffice.png' />
                    </Grid.Column>
                    <Grid.Column width="11">

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};



export default backoffice;