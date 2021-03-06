import React, { useState } from 'react';
import { Grid, Menu, Divider, Header, Table } from "semantic-ui-react";
import { BASE_URL } from '../../../constants/config';
import FeedBack from './FeedBack';
import Manual from './Manual';
import Services from "./Services";
import SiteForm from './SiteForm';
import Steps from './Steps';
import Gallery from './Gallery';
const Configuration = () => {
    const [option, setOption] = useState(0);

    return (
        <Grid columns="16" className="backoffice-configuration">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>ADMINISTRACIÓN DE LA WEB</Header>
                    <Divider />
                    <Menu>
                        <Menu.Item
                            onClick={() => setOption(0)}
                            name='Datos del sitio'
                        />
                        <Menu.Item
                            onClick={() => setOption(1)}
                            name='Manual'
                        />
                        <Menu.Item
                            onClick={() => setOption(2)}
                            name='Servicios'
                        />
                        <Menu.Item
                            onClick={() => setOption(3)}
                            name='Opiniones'
                        />
                        <Menu.Item
                            onClick={() => setOption(4)}
                            name='Pasos'
                        />
                        <Menu.Item
                            onClick={() => setOption(5)}
                            name='Galeria'
                        />
                    </Menu>
                    <Divider />
                    {option === 0 && (<SiteForm option={option} />)}
                    {option === 1 && (<Manual option={option} />)}
                    {option === 2 && (<Services option={option} />)}
                    {option === 3 && (<FeedBack option={option} />)}
                    {option === 4 && (<Steps option={option} />)}
                    {option === 5 && (<Gallery option={option} />)}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Configuration;