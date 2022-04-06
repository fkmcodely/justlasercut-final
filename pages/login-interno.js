import React from 'react';
import { Button, Container, Grid, Form, Input } from 'semantic-ui-react';
import { useFormik } from "formik";
import axios from "axios";

const loginInterno = () => {

	const { values, handleSubmit, reset, setFieldValue } = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			const { data : { token } } = await axios.post('/api/administrators',values);
			if (token) {
				console.log('Inicio de sesión valido')
			} else {
				console.log('Inicio de sesión invalido')
			}
		}
	})
	return (
		<Container className="login-interno">
			<Grid columns="16" verticalAlign='middle'>
				<Grid.Row>
					<Grid.Column computer={8}>
							<Form onSubmit={handleSubmit} className="login-interno__fields">
								<h2 style={{ textAlign: 'center' }}>AREA DE ADMINISTRADORES</h2>
								<Input required value={values.email} onChange={ev => setFieldValue('email',ev.target.value)}placeholder="Email" type="email" />
								<Input required value={values.password} onChange={ev => setFieldValue('password',ev.target.value)} placeholder="Contraseña" type="password"/>

								<Button type="submit" primary>
									Iniciar Sesión
								</Button>
							</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default loginInterno;