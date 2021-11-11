import React, { useState } from 'react';
import { Grid , Header , Menu, Divider} from "semantic-ui-react";
import { BASE_URL } from '../../../constants/config';
import Manual from './Manual';
import Services from "./Services";
import SiteForm from './SiteForm';

const Configuration = () => {
    const [option,setOption] = useState(0);
    
    return (
        <Grid columns="16" className="backoffice-configuration">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>ADMINISTRACIÓN DE LA WEB</Header>
                    <Divider/>
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
                    </Menu>
                    <Divider/>
                    { option === 0 && (<SiteForm option={option}/>)}
                    { option === 1 && (<Manual option={option} />)}
                    { option === 2 && (<Services option={option} />)}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Configuration;