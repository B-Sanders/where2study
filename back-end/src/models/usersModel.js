import db from "../database/base";

export async function createUser({
  activePost,
  userClasses,
  displayName,
  userEmail,
  userPassword,
  userMajor,
  userPronouns,
}) {
  try {
    return await db
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
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
          .set(userData);
        console.log("Successfully added user to the database...");
        return 200;
      });
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      return 301;
    } else {
      return 300;
    }
  }
}

export async function recoverAccount({ userEmail }) {
  try {
    return await db
      .auth()
      .sendPasswordResetEmail(userEmail)
      .then(function () {
        return 200;
      });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return 301;
    } else if (err.code === "auth/invalid-email") {
      return 302;
    } else if (err.code === "auth/argument-error") {
      return 303;
    } else {
      return 300;
    }
  }
}

export function obtainUser(userid) {
  // Send snapshot of the specific user
  return db
    .database()
    .ref("Users/" + userid)
    .once("value")
    .then((snapshot) => snapshot.val())
    .catch((error) => console.log(error));
}

export function editUser({
  userClasses,
  displayName,
  // userEmail,
  userMajor,
  userPronouns,
  userID,
}) {
  var updates = {};

  var edit = {
    classes: userClasses,
    display_name: displayName,
    // email: userEmail,
    major: userMajor,
    pronouns: userPronouns,
    uuid: userID,
  };

  // Overwrite request, identified by userID
  updates["/Users/" + userID] = edit;

  // Return updated request
  return db.database().ref().update(updates);
}
