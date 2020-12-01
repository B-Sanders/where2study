import React, { Component } from 'react';
import { IconButton, Icon, Tooltip, Whisper, Footer, Col, FlexboxGrid} from 'rsuite';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import RequestButton from './Home/RequestButton';

// Note will need to implement Unit 4 in order to adjust to changes in DB

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <>
            <Footer>
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
            </Footer>
            </>
        )
    }
};

export default Home;