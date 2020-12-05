import React, { Component } from 'react';
import {FlexboxGrid, Button} from "rsuite";
import cseBuilding from "../../images/cse-building.jpeg"
import priceCenter from "../../images/price-center.jpg"
import geiselLibrary from "../../images/geisel-libary.jpg"
import atkinsonHall from "../../images/atkinson-hall.jpg"
import galbraithHall from "../../images/galbraith-hall.jpg"

import StudyPanel from "./StudyPanel.js"
import { DataContext } from "../../state/context.js"

import ViewRequestModal from "../Requests/ViewRequestModal.js"

function renderPanel(sreq) {
    var sreqTitle = sreq['reqTitle'];
    var sreqClas = sreq['clas'];
    var sreqLoc = sreq['loc'];
    var sreqLocImage = sreq['locImage'];
    var sreqNoiseRating = sreq['noiseRating'];
    React.createElement(
        "StudyPanel", 
        {reqTitle:{sreqTitle},clas:{sreqClas}, loc:{sreqLoc}, locImage:{sreqLocImage}, noiseRating:{sreqNoiseRating}},
      );
}

function renderAllPanels(reqList) {
    reqList.forEach(renderPanel);
}

let images = new Map();
images.set("Atkinson_Hall", atkinsonHall);
images.set("CSE_Building", cseBuilding);
images.set("Galbraith_Hall", galbraithHall);
images.set("GeiselF2", geiselLibrary);
images.set("Price_Center", priceCenter);


class StudyRequests extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showViewModal: false,       // State Variable used to decide to conditionally render the view modal.
            viewedRequest: 0
        };

    }

    convertTime(timeString){
        let modifier = timeString.substring(4, 6);
        if(modifier === "pm"){
            let hour = parseInt(timeString.substr(0, 2)) + 12;
            console.log("Hour: " + hour);
            return hour + timeString.substring(2, 4);
        }
        return timeString.substring(0, 4);
    }

    filterCheck(studyReq) {
        console.log('this.props.filters', this.props.filters);
        return ((this.props.filters[2] !== null && studyReq.noise_rating !== this.props.filters[2])
            ||
            ((this.props.filters[1] !== null && studyReq.class.toLowerCase() !== this.props.filters[1]))
            ||
            ((this.props.filters[0] !== null && studyReq.location !== this.props.filters[0]))
            ||
            ((this.props.filters[3] !== null && this.convertTime(studyReq.study_end) !== this.props.filters[3].getHours() + ":" + this.props.filters[3].getMinutes())));
    }


    render(){
        var requestsList = [];
        Object.keys(this.context.state.requests).forEach((key) => requestsList.push(this.context.state.requests[key]));
        return(
        <div style={{overflow: 'visible'}}>
            { this.state.showViewModal && <ViewRequestModal shouldShow={this.state.showViewModal} studyRequest={this.state.viewedRequest} parentCallBack ={ ()=>{this.setState({ showViewModal: false})} } /> }
            <FlexboxGrid justify="center">
                <FlexboxGrid justify="space-around">
                    {requestsList.map((studyReq) => {

                        if(this.filterCheck(studyReq)){
                            return(
                                <></>
                            )
                        }
                        return ( 
                            <Button onClick={ ()=>{this.setState({showViewModal: true, viewedRequest: studyReq})}}>
                                <StudyPanel reqTitle={studyReq.request_title} clas={studyReq.class} 
                                loc={studyReq.location} locImage={images.get(studyReq.location)} noiseRating={studyReq.noise_rating}>
                                </StudyPanel>
                            </Button>
                        )
                    })}
                </FlexboxGrid>
            </FlexboxGrid>
        </div>
        )
    }
}

StudyRequests.contextType = DataContext;

export default StudyRequests;