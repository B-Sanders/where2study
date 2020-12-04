import React, { useContext } from 'react';
import { DataContext } from '../state/context';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { Col, FlexboxGrid} from 'rsuite';
import RequestButton from './Home/RequestButton';
//import Col from 'rsuite/lib/Carousel';
function Home() {
    const { state, dispatch } = useContext(DataContext);
    console.log(state);
    return (
            <>

            <FlexboxGrid colSpan={100} justify="center">
                <FlexboxGridItem>
                    <Col >

                    <h1>Home page</h1>

                    {/**
                     * Conditionally render the create/edit button based on whether the user has an active request
                     */}
                    <RequestButton />
                    
                    </Col>
                </FlexboxGridItem>
            </FlexboxGrid>
  
            </>
    );
}

export default Home;