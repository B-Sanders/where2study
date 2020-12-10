import React, { Component } from 'react';
import {FlexboxGrid, Button} from "rsuite";
import cseBuilding from "../../images/cse-building.jpeg"
import priceCenter from "../../images/price-center.jpg"
import geiselLibrary from "../../images/geisel-libary.jpg"
import atkinsonHall from "../../images/atkinson-hall.jpg"
import galbraithHall from "../../images/galbraith-hall.jpg"
import priceCenterWest from "../../images/price-center-west.jpg"
import priceCenterEast from "../../images/price-center-east.jpg"
import otherLocations from "../../images/other-locations.jpg"
import theLoft from "../../images/the-loft.jpg"
import ecoFlats from "../../images/eco-flats.jpg"
import villageNorth from "../../images/village-north.jpg"
import zoomCall from "../../images/zoom-logo.jpg"

import LocationPanel from "./LocationPanel.js"
import { DataContext } from "../../state/context.js"

import ViewLocationModal from "./ViewLocationModal"


let images = new Map();
images.set("Atkinson Hall", atkinsonHall);
images.set("CSE Building", cseBuilding);
images.set("Galbraith Hall", galbraithHall);
images.set("Geisel First Floor", geiselLibrary);
images.set("Geisel Second Floor", geiselLibrary);
images.set("Geisel Third Floor", geiselLibrary);
images.set("Geisel Fourth Floor", geiselLibrary);
images.set("Geisel Fifth Floor", geiselLibrary);
images.set("Geisel Sixth Floor", geiselLibrary);
images.set("Geisel Seventh Floor", geiselLibrary);
images.set("Geisel Eighth Floor", geiselLibrary);
images.set("Geisel Ninth Floor", geiselLibrary);
images.set("Price Center West", priceCenterWest);
images.set("Price Center East", priceCenterEast);
images.set("Other Location", otherLocations);
images.set("The Loft",theLoft);
images.set("Village EcoFlats",ecoFlats);
images.set("Village North Break Study Lounge",villageNorth);
images.set("Zoom Call",zoomCall);


class StudyRequests extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showViewModal: false,    // State Variable used to decide to conditionally render the view modal.
            viewedLocation: 0
        };

    }

    render(){
        var locationsList = [];
        Object.keys(this.context.state.locations).forEach((key) => locationsList.push(this.context.state.locations[key]));
        return(
        <div style={{overflow: 'visible'}}>
            { this.state.showViewModal && <ViewLocationModal shouldShow={this.state.showViewModal} location={this.state.viewedLocation} parentCallBack ={ ()=>{this.setState({ showViewModal: false})} } /> }
            <FlexboxGrid justify="center">
                <FlexboxGrid justify="space-around">
                    {locationsList.map((locationData) => {
                        return ( 
                            <Button onClick={ ()=>{this.setState({showViewModal: true, viewedLocation: locationData})}}>
                                <LocationPanel
                                loc={locationData.location_name} locImage={images.get(locationData.location_name)} noiseRating={locationData.noise_level} trafficLevel={locationData.traffic_level}>
                                </LocationPanel>
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