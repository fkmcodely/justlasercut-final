import React, { useEffect, useState } from 'react';
import { Grid ,Form , Input, Button } from 'semantic-ui-react';
import axios from "axios";
import { useForm } from 'react-hook-form';

const SiteForm = ({option}) => {
    const [site,setSite] = useState(false);
    const [loading,setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
          sitename: site.sitename,
          email: site.email,
          maintance: site.maintance,
          phone: site.phone,
        },
    });

    useEffect(() => {
        fetchDataSite()
    },[]);

    const saveSiteInfo = (data) => {
        setLoading(true);
        const save = async () => {
            try {
                const updatedInfo = await axios.put('/api/site',{
                    _id: site._id,
                    ...data
                });
                setLoading(false);
                
            } catch (err) {
                console.error(`Error al guardar los datos: ${err}`)
                setLoading(false);
            }
        };
        save();
    };
    
    const fetchDataSite = () => {
        const fetchData = async () => {
            try {
                const request = await axios('/api/site');
                const configuration = request?.data?.configurationSite[0];
                console.log(configuration)
                setSite(configuration);
            } catch (error) {
                console.error('Error, al obtener propiedades de la web:');
            }
        };
        fetchData();
    };
    
    return (
        <Grid columns="16" className="site-data">
            <Grid.Row>
                <Grid.Column width="8">
                    <Form onSubmit={handleSubmit(saveSiteInfo)}>
                        <Form.Field>
                            <span>Nombre:</span>
                            <input defaultValue={site.sitename} {...register('sitename')} placeholder="Nombre de la web"/>
                        </Form.Field>
                        <Form.Field>
                            <span>Email:</span>
                            <input defaultValue={site.email} {...register('email')} placeholder="Email de contacto" />
                        </Form.Field>
                        <Form.Field>
                            <span>Activar o desactivar mantenimiento del sitio:</span>
                            <input defaultValue={site.maintance} {...register('maintance')} type="checkbox" placeholder="Email de contacto" />
                        </Form.Field>
                        <Form.Field>
                            <span>Telefono de contacto:</span>
                            <input defaultValue={site?.phone?.replace(' ','')} {...register('phone')} type="number" placeholder="Telefono de contacto" />
                        </Form.Field>
                        
                        <Button loading={loading} content="Guardar" secondary floated="right"/>
                    </Form>
                </Grid.Column>
                <Grid.Column width="8">

                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default SiteForm;