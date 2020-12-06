import db from '../database/base';


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
