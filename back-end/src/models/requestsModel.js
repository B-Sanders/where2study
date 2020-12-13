import { request } from 'express';
import db from '../database/base';
import { updateLocationsNoiseLevels } from './locationsModel';


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
    userUpdate[`Users/${userId}/active_post`] = userId;

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
            [userId]: displayName,
        },
        study_start: studyStart,
        study_end: studyEnd
    }).then(() => {
        updateLocationsNoiseLevels();
        return console.log('Success');
    });
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
    updateLocationsNoiseLevels();
    return db.database().ref().update(updates);
}


export function addPartner({partnerId, partnerName, posterId}) {

        // Add study partner as child to request/study_partners
        var userUpdate = {};
        userUpdate[`Users/${partnerId}/active_post`] = posterId;
        console.log('POSTER ID', posterId);
        db.database().ref().update(userUpdate);

        return db.database().ref(`RequestsList/${posterId}/study_partners/`).update({
            [partnerId]:partnerName
        }).then(() => (
            console.log('Partner added')
        ));
}

export function deleteRequest({ userId, location }) {
    var updates = {};
    updates[`Users/${userId}/active_post`] = false;

    var userUpdate = {};
    // Update user active_post to false once request is deleted
    db.database().ref().update(updates);

    return db.database().ref(`RequestsList/${userId}/study_partners`).once('value', (snapshot) => {
        const studyPartners = snapshot.val();
        Object.keys(studyPartners).forEach((studyPartner) => {
            userUpdate[`Users/${studyPartner}/active_post`] = false;
            
        });
        db.database().ref(`Locations/${location}/active_requests`).child(userId).remove();
        db.database().ref('RequestsList').child(userId).remove().then(() => {
            "Successful deletion"
        });
        db.database().ref().update(userUpdate);
    });
}

export function leaveRequest({userId, posterId}) {

    // Add study partner as child to request/study_partners
    
    db.database().ref().update(userUpdate);

    return db.database().ref(`RequestsList/${posterId}/study_partners/`).child(userId).remove().then(() => {
        console.log('Partner removed')
    });
}