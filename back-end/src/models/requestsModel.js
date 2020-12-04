import db from '../database/base';


export function getAllRequests() {

    // Send snapshot of requests 
    return db.database().ref('RequestsList').once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}


export function createRequest({userId, reqClass, desc, location, maxPartners, noiseRating, studyEnd}) {

    // Create new request with index of userId
    return db.database().ref('RequestsList' + userId).set({
        user_id: userId,
        class: reqClass,
        description: desc,
        location: location,
        max_partners: maxPartners,
        noise_rating: noiseRating,
        study_end: studyEnd
    }.then(() => (
        "Successful creation"
    ))
    );
}


export function editRequest({userId, reqClass, desc, location, maxPartners, noiseRating, studyEnd}) {
    var updates = {};

    // Create new object for overwrite
    var edit = {
        user_id: userId,
        class: reqClass,
        description: desc,
        location: location,
        max_partners: maxPartners,
        noise_rating: noiseRating,
        study_end: studyEnd
    }

    // Overwrite request, identified by userID
    updates['/RequestsList/' + userId] = edit;

    // Return updated request
    return db.database().ref().update(updates);
}


export function deleteRequest(userId) {

    // Remove child via userID
    return db.database().ref('RequestsList').child(userId).remove().then(() => {
        "Successful deletion"
    });
}