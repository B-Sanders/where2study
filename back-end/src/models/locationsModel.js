import db from '../database/base';
import { getAllRequests } from './requestsModel';
import scrapeUCSD from '../utils/scrape-ucsd';


export function getAllLocations() {
    
    // Send snapshot of the locations
    return db.database().ref('Locations').once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}


export function getLocationRequests(reqHeaders) {
    
    // Send snapshot of active requests at the location
    return db.database().ref(`Locations/${reqHeaders['location']}/active_requests`).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}


/* Loops over all study requests and averages the reported noise levels for each location
    then updates the locations noise level in the DB.
*/
export async function updateLocationsNoiseLevels() {
    let locationUpdates = {};
    let locationCount = {};
    const requests = await getAllRequests();
    const locations = await getAllLocations();
    Object.keys(requests).forEach((request) => {
        if (locationUpdates[requests[request].location]) {
            locationUpdates[requests[request].location] += requests[request].noise_rating;
            locationCount[requests[request].location] += 1;
        } else {
            locationUpdates[requests[request].location] = requests[request].noise_rating;
            locationCount[requests[request].location] = 1;
        }
    });
    let locationsAverages = {};
    Object.keys(locationUpdates).forEach((locationKey) => {
        locationsAverages[locationKey] = Math
            .round(locationUpdates[locationKey] / locationCount[locationKey]);
        db.database().ref(`Locations/${locationKey}`).update({
            noise_level: locationsAverages[locationKey],
        });
    });
}

export async function updateLocationsTrafficLevel() {
    const geiselValues = {
        GeiselF1: '',
        GeiselF2: '',
        GeiselF3: '',
        GeiselF4: '',
        GeiselF5: '',
        GeiselF6: '',
        GeiselF7: '',
        GeiselF8: '',
        GeiselF9: '',
    };
    const priceCenterValues = {
        PriceCenterEast: '',
        PriceCenterWest: '',
    };
    const scrapedData = await scrapeUCSD();
    scrapedData.forEach((areaList) => {
        if (areaList[0] === 'Geisel Library') {
            Object.keys(geiselValues).forEach((key) => {
                geiselValues[key] = areaList[1];
                db.database().ref(`Locations/${key}`).update({
                    traffic_level: geiselValues[key],
                });
            });
        }
        else if (areaList[0] === 'Price Center') {
            Object.keys(priceCenterValues).forEach((key) => {
                priceCenterValues[key] = areaList[1];
                db.database().ref(`Locations/${key}`).update({
                    traffic_level: priceCenterValues[key],
                });
            });
        }
    });

}