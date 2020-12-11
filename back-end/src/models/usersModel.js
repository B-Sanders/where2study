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

export function userLogin({ userEmail, userPassword }) {
  try {
    return db
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        console.log("valid user");
        const valid = {
          status: 200,
          uid: user,
        };

        return valid;
      });
    // .catch(function (error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   if (errorCode === "auth/wrong-password") {
    //     Alert.error("The username and password did not match.", 4000);
    //   } else if (errorCode === "auth/user-not-found") {
    //     Alert.error("The user does not exist.", 4000);
    //   } else {
    //     Alert.error(errorMessage, 4000);
    //   }
    // });
  } catch (error) {
    console.log("error");
    console.log(error);
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

export function obtainUser(reqHeaders) {
  // Send snapshot of the specific user
  return db
    .database()
    .ref("Users/" + reqHeaders["userid"])
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
