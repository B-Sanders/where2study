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
images.set("AtkinsonHall", atkinsonHall);
images.set("CSEBuilding", cseBuilding);
images.set("GalbraithHall", galbraithHall);
images.set("GeiselF2", geiselLibrary);
images.set("PriceCenter", priceCenter);


class StudyRequests extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showViewModal: false,       // State Variable used to decide to conditionally render the view modal.
            viewedRequest: 0
        };

    }

    convertTime(timeString){
        let time = timeString.split(":");
        let hour = parseInt(time[0]);
        let modifier = time[1].split(" ");

        if(modifier.length === 2){ // Time such as 12:00 pm
            if(hour === 12){
                hour = 0;
            }
            if(modifier[1].toLowerCase() === "pm"){
                hour += 12;
            }
            return hour + ":" + parseInt(modifier[0]);
        }else if(time[1].length > 2){ // Time such as 12:00pm
            if(hour === 12){
                hour = 0;
            }
            modifier = time[1].substring(2, 4);
            if(modifier.toLowerCase() === "pm"){
                hour += 12;
            }
            return hour + ":" + parseInt(time[1].substring(0, 2));
        }
        return hour + ":" + parseInt(time[1]); // Time such as 19:59
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