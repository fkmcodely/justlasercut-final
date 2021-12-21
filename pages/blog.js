import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, singOut, getSession, signOut } from "next-auth/react";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import ButtonTop from "../components/ButtonTop/ButtonTop";
import { Container, Grid, Header, Image, Divider } from "semantic-ui-react";
import Link from 'next/link'

const languages = {
    en: require('../locale/en/commons.json'),
    es: require('../locale/es/commons.json'),
}

function Blog({ blog }) {
    const [user, setUser] = useState();
    const { locale } = useRouter();
    const t = languages[locale];
    const router = useRouter()

    useEffect(() => {
        const session = async (req, res) => {
            const user = await getSession({ req });
            if (user?.user) {
                setUser(user.user);
            } else {
                setUser(false);
            }
        }
        session();
    }, [])

    return (
        <Container style={{ minHeight: '70vh', paddingTop: '40px', paddingBottom: '70px' }}>
            <Grid columns={16}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header>Últimos artículos</Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                {
                    blog.blog.map((entry) => (
                        <Grid.Row onClick={(ev) => {
                            ev.preventDefault();
                            localStorage.setItem('article', JSON.stringify({ id: entry.id }))
                            router.push('/articulo');
                        }}>
                            <Grid.Column width={16} className="blog-entry">
                                <Grid columns={16}>
                                    <Grid.Row>
                                        <Grid.Column width={1}>
                                            <Image className="image-entry" rounded style={{ width: '48px', height: '48px' }} src={entry.image} alt='' />
                                        </Grid.Column>
                                        <Grid.Column width={15}>
                                            <Header className="text-entry" as='h4' style={{ margin: '0px' }}>{entry.title}</Header>
                                            <Header as='h6' style={{ margin: '0px', fontWeight: 'light' }}>8 diciembre 2021</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    ))
                }
            </Grid>
        </Container>
    );
}

export async function getServerSideProps() {

    const { data } = await axios(`${BASE_URL}/api/blog`);

    console.log(data)
    return {
        props: {
            blog: data
        }
    }
}


export default Blog

