import React, { Component } from 'react';
import {Col, Rate, Icon, FlexboxGrid, Panel, Message, Button} from "rsuite";
import cseBuilding from "../../images/cse-building.jpeg"
import priceCenter from "../../images/price-center.jpg"
import geiselLibrary from "../../images/geisel-libary.jpg"
import atkinsonHall from "../../images/atkinson-hall.jpg"
import galbraithHall from "../../images/galbraith-hall.jpg"

import StudyPanel from "./StudyPanel.js"
import { DataContext } from "../../state/context.js"

function renderPanel(sreq) {
    var sreqTitle = sreq['reqTitle'];
    var sreqClas = sreq['clas'];
    var sreqLoc = sreq['loc'];
    var sreqLocImage = sreq['locImage'];
    var sreqNoiseRating = sreq['noiseRating']
    React.createElement(
        "StudyPanel", 
        {reqTitle:{sreqTitle},clas:{sreqClas}, loc:{sreqLoc}, locImage:{sreqLocImage}, noiseRating:{sreqNoiseRating}},
      );
}

function renderAllPanels(reqList) {
    reqList.forEach(renderPanel);
}

var studyReq1= {
    reqTitle: "Studying for CSE110 Midterm",
    clas: "CSE110",
    loc: "GalbraithHall",
    locImage: galbraithHall,
    noiseRating: 3      
};

var studyReq2= {
        reqTitle: "Studying for CSE101 Exam 3",
        clas: "CSE101",
        loc: "Price Center",
        locImage: priceCenter,
        noiseRating: 5      
};

var studyReq3= {
        reqTitle: "Studying for CSE15l Midterm",
        clas: "CSE15l",
        loc: "CSE Building",
        locImage: cseBuilding,
        noiseRating: 2       
};

var studyReqs= [studyReq1, studyReq2, studyReq3];



class StudyRequests extends Component{
    
    render(){
        console.log(this.context.state);
        var requestsList = [];
        Object.keys(this.context.state.requests).forEach((key) => requestsList.push(this.context.state.requests[key]));
        console.log(requestsList);
        return(
        <div>
        <FlexboxGrid justify="center">
            <FlexboxGrid justify="space-around">
                {requestsList.map((studyReq) => {
                    console.log(studyReq)
                    return <Button><StudyPanel reqTitle={studyReq.request_title} clas={studyReq.class} loc={studyReq.location} locImage={galbraithHall} noiseRating={studyReq.noise_rating}></StudyPanel></Button>
                })}
            </FlexboxGrid>
        </FlexboxGrid>
        </div>
        )
    }
}

StudyRequests.contextType = DataContext;

export default StudyRequests;