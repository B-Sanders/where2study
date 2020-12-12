import React, { Component } from 'react';
import {FlexboxGrid, Button} from "rsuite";
import cseBuilding from "../../images/cse-building.jpeg"
import priceCenter from "../../images/price-center.jpg"
import geiselLibrary from "../../images/geisel-libary.jpg"
import atkinsonHall from "../../images/atkinson-hall.jpg"
import galbraithHall from "../../images/galbraith-hall.jpg"
import other from "../../images/other-locations.jpg"
import priceCenterEast from "../../images/price-center-east.jpg"
import priceCenterWest from "../../images/price-center-west.jpg"
import loft from "../../images/the-loft.jpg"
import ecoFlats from "../../images/eco-flats.jpg"
import village from "../../images/village-north.jpg"

import zooms from "../../images/zoom-logo.jpg"

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
images.set("GeiselF1", geiselLibrary);
images.set("GeiselF2", geiselLibrary);
images.set("GeiselF3", geiselLibrary);
images.set("GeiselF4", geiselLibrary);
images.set("GeiselF5", geiselLibrary);
images.set("GeiselF6", geiselLibrary);
images.set("GeiselF7", geiselLibrary);
images.set("GeiselF8", geiselLibrary)
images.set("GeiselF9", geiselLibrary);
images.set("OtherLocation", other);
images.set("PriceCenterEast", priceCenterEast);
images.set("PriceCenterWest", priceCenterWest);
images.set("TheLoft", loft);
images.set("VillageEcoFlats", ecoFlats);
images.set("VillageNorthBreakStudyLounge", village);
images.set("PriceCenter", priceCenter);
images.set("Zoom", zooms);



class StudyRequests extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showViewModal: false,       // State Variable used to decide to conditionally render the view modal.
            viewedRequest: 0,
            posterId: " "
        };

    }

    checkTime(timeString, minHour, minMinute){
        let time = timeString.split(":");
        let hour = parseInt(time[0]);
        let modifier = time[1].split(" ");
        let minute = time[1];

        if(modifier.length === 2){ // Time such as 12:00 pm
            if(hour === 12){
                hour = 0;
            }
            if(modifier[1].toLowerCase() === "pm"){
                hour += 12;
            }
            minute = parseInt(modifier[0]);
        }else if(time[1].length > 2){ // Time such as 12:00pm
            if(hour === 12){
                hour = 0;
            }
            modifier = time[1].substring(2, 4);
            if(modifier.toLowerCase() === "pm"){
                hour += 12;
            }
            minute = parseInt(time[1].substring(0, 2));
        }
        return hour > minHour || (hour === minHour && minute >= minMinute); // Time such as 19:59
    }

    filterCheck(studyReq) {
        return ((this.props.filters[2] !== null && studyReq.noise_rating !== this.props.filters[2])
            ||
            ((this.props.filters[1] !== null && studyReq.class !== this.props.filters[1]))
            ||
            ((this.props.filters[0] !== null && studyReq.location !== this.props.filters[0]))
            ||
            ((this.props.filters[3] !== null && !this.checkTime(studyReq.study_end, this.props.filters[3].getHours(), this.props.filters[3].getMinutes()))));
    }


    render(){
        var requestsList = [];
        Object.keys(this.context.state.requests).forEach((key) => requestsList.push(this.context.state.requests[key]));
        console.log(this.context.state.requests);
        return(
        <div style={{overflow: 'visible'}}>
            { this.state.showViewModal && <ViewRequestModal shouldShow={this.state.showViewModal} studyRequest={this.state.viewedRequest} posterId={this.state.posterId} parentCallBack ={ ()=>{this.setState({ showViewModal: false})} } /> }
            <FlexboxGrid justify="center">
                <FlexboxGrid justify="space-around">
                    {requestsList.map((studyReq) => {

                        if(this.filterCheck(studyReq)){
                            return(
                                <></>
                            )
                        }
                        console.log(studyReq.user_id);
                        return (
                            <Button onClick={ ()=>{this.setState({showViewModal: true, viewedRequest: studyReq, posterId: studyReq.user_id})}}>
                                <StudyPanel reqTitle={studyReq.request_title} clas={studyReq.class} 
                                loc={studyReq.location_name} locImage={images.get(studyReq.location)} noiseRating={studyReq.noise_rating}>
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