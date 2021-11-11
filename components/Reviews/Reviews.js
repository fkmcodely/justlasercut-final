import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { BASE_URL } from '../../constants/config';
const Reviews = () => {

    const reviews = [
        {
            description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”',
            author: 'Kevin 1'
        },
        {
            description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”',
            author: 'Kevin 2'
        },
        {
            description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”',
            author: 'Kevin 3'
        }
    ]
    return (
        <Container fluid className="reviews"> 
            <Container>
                <Grid columns="16">
                    <Grid.Row className="reviews__list">
                        {
                            reviews?.map((review,keyItem) => (
                            <Review {...review} key={keyItem} />
                            ))
                        }
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
};

const Review = ({ description , author }) => {

    return(
        <Grid.Column mobile="16" width="5" className="review">
            <Grid columns="16">
                <Grid.Row>
                    <Grid.Column width="4">
                        <Image src={`${BASE_URL}/avatar.png`} />
                    </Grid.Column>
                    <Grid.Column width="12">
                        <p>{description}</p>
                        <p>{author}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    )
}

export default Reviews;