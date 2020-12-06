import db from '../database/base';


export function getAllRequests() {

    // Send snapshot of requests 
    return db.database().ref('RequestsList').once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
}


export function createRequest({ 
    userId,
    displayName,
    reqClass,
    desc,
    location,
    maxPartners,
    noiseRating,
    title,
    studyStart,
    studyEnd 
}) {

    var userUpdate = {};
    userUpdate[`Users/${userId}/active_post`] = true;

    // Add child to active_requests -->  "userId": userId
    db.database().ref(`Locations/${location}/active_requests/`).update({
        [userId]:userId
    }).then(() => (
        console.log('Location updated')
    ));

    // Update user active_post to true once request is created
    db.database().ref().update(userUpdate);

    // Create new request with index of userId
    return db.database().ref('RequestsList/' + userId).set({
        user_id: userId,
        class: reqClass,
        description: desc,
        location: location,
        max_partners: maxPartners,
        noise_rating: noiseRating,
        request_title: title,
        study_partners: {
            1: displayName,
        },
        study_start: studyStart,
        study_end: studyEnd
    }).then(() => (
        console.log('Success')
    ));
}


export function editRequest({
    userId,
    title,
    reqClass,
    desc,
    location,
    maxPartners,
    noiseRating,
    studyEnd
}) {
    var updates = {};
    // Create new object for overwrite
    var edit = {
        user_id: userId,
        class: reqClass,
        description: desc,
        location: location,
        max_partners: maxPartners,
        noise_rating: noiseRating,
        study_end: studyEnd,
        request_title: title,
    }

    // Overwrite request, identified by userID
    Object.keys(edit).forEach((key) => {
        if (edit[key] !== null && edit[key] !== '')
            { 
                updates[`RequestsList/${userId}/${key}`] = edit[key]
            }
    })
    // Return updated request
    return db.database().ref().update(updates);
}


export function deleteRequest({userId, location}) {

    var updates = {};
    updates[`Users/${userId}/active_post`] = false;

    // Update user active_post to false once request is deleted
    db.database().ref().update(updates);

    // Remove request from location active_requests
    db.database().ref(`Locations/${location}/active_requests`).child(userId).remove();

    // Remove child via userID
    return db.database().ref('RequestsList').child(userId).remove().then(() => {
        "Successful deletion"
    });
}