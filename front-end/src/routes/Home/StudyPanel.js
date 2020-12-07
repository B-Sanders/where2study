import React from 'react';
import {Col, Rate, Icon, FlexboxGrid, Panel, Message} from "rsuite";

function StudyPanel ({ reqTitle, clas, loc, locImage, noiseRating}) {
    return(
        <FlexboxGrid.Item xs={24} sm={24} md={12} lg={6}>
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                <img src={locImage} height="240" />
                <Message
                    style={{backgroundColor:'white'}}
                    title={reqTitle}
                    description={
                        <p>
                            {clas}
                            <br />
                            {loc}
                        </p>
                    }
                />
                <Col xs={24}> 
                    <Rate readOnly defaultValue={noiseRating} value={noiseRating} size="sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
                </Col>
            </Panel>
        </FlexboxGrid.Item>
    )
}

export default StudyPanel;