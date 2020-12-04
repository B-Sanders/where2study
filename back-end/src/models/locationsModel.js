import db from '../database/base';


export function getAllLocations() {
    
    // Send snapshot of the locations
    return db.database().ref('Locations').once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}

