import db from "../database/base";

export function createUser({
  activePost,
  userClasses,
  displayName,
  userEmail,
  userPassword,
  userMajor,
  userPronouns,
}) {
  try {
    return db
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        if (user) {
          const userID = user.user.uid;
          const userData = {
            active_post: activePost,
            classes: userClasses,
            display_name: displayName,
            email: userEmail,
            major: userMajor,
            pronouns: userPronouns,
            uuid: userID,
          };

          // Create a new user with index of userId
          db.database()
            .ref("Users/" + userID)
            .set(userData)
            .then(() => console.log("Successful creation"));
        }
      });
  } catch (error) {
    return error;
  }
}

export function obtainUser(userID) {
  // Send snapshot of the specific user
  return db
    .database()
    .ref("Users/" + userID)
    .once("value")
    .then((snapshot) => snapshot.val())
    .catch((error) => console.log(error));
}

export function editUser({
  activePost,
  userClasses,
  displayName,
  userEmail,
  userMajor,
  userPronouns,
  userID,
}) {
  var updates = {};

  var edit = {
    active_post: activePost,
    classes: userClasses,
    display_name: displayName,
    email: userEmail,
    major: userMajor,
    pronouns: userPronouns,
    uuid: userID,
  };

  // Overwrite request, identified by userID
  updates["/Users/" + userID] = edit;

  // Return updated request
  return db.database().ref().update(updates);
}
