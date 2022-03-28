import React from 'react';
import PropTypes from 'prop-types';
import {Container, Typography, Link} from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://Metrologistnsnd-frontend.herokuapp.com/">
                Metrologist
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function Footer(props) {
    const {description, title} = props;
    return (
        <footer>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Copyright/>
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};
