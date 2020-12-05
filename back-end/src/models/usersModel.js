import db from '../database/base';


export function createUser({activePost, userClasses, displayName, userEmail, userMajor, userPronouns, userID}) {

    // Create a new user with index of userId
    return db.database().ref('Users/' + userID).set({
        active_post: activePost,
        classes: userClasses,
        display_name: displayName,
        email: userEmail,
        major: userMajor,
        pronouns: userPronouns,
        uuid: userID
    }).then (() => (
        "Successful creation"
    ));
}


export function obtainUser(reqHeaders) {

    // Send snapshot of the specific user
    return db.database().ref('Users/' + reqHeaders['userid']).once('value')
    .then(snapshot => snapshot.val())
    .catch(error => console.log(error));
}


export function editUser({activePost, userClasses, displayName, userEmail, userMajor, userPronouns, userID}) {
    var updates = {};

    var edit = {
        active_post: activePost,
        classes: userClasses,
        display_name: displayName,
        email: userEmail,
        major: userMajor,
        pronouns: userPronouns,
        uuid: userID
    }

    // Overwrite request, identified by userID
    updates['/Users/' + userID] = edit;

    // Return updated request
    return db.database().ref().update(updates);
}