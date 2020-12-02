import React, { useContext } from 'react';
import { DataContext } from '../state/context';

function Home() {
    const { state, dispatch } = useContext(DataContext);
    console.log(state);
    return (
        <h1>Home page</h1>
    );
}

export default Home;