import { Container } from '@material-ui/core';
import React from 'react';
import DashboardProgress from './DashboardProgress';

const Home = ({userId}) => 
    <Container>
        <DashboardProgress userId={userId}/>
    </Container>

export default Home;