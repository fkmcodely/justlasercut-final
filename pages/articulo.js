import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Grid, Header, Image, Divider } from "semantic-ui-react";
import parse from 'html-react-parser';

const articulo = ({ blog }) => {
    const [article, setArticle] = useState();

    useEffect(() => {
        const article = JSON.parse(localStorage.getItem('article'))
        const handler = async () => {
            try {
                const { data } = await axios(`/api/blog`);
                console.log(data)
                data?.blog?.map(entry => {
                    if (entry.id === article.id) {
                        setArticle(entry)
                    }
                })
            } catch (err) {
                console.error(err)
            }
        };
        handler();
    }, [])

    return (
        <Container style={{ minHeight: '70vh', paddingTop: '40px', paddingBottom: '70px' }}>
            <Grid columns={16}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Image src={article?.image} alt='' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h1'>{article?.title}</Header>
                        <Header as='h3'>{article?.subtitle}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column width={16}>
                        <p>{parse(`${article?.content}`)}</p>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
            </Grid>
        </Container>
    );
};

export default articulo;